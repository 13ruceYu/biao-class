;
(function () {
  'use strict';

  window.biaoPopup = {
    boot,
  };

  // 全文变量，整个js文件都看得见
  let trigger, popup, mask, config;

  // 默认配置
  const defaultConfig = {
    position: 'center',
    offsetX: 0,
    offsetY: 0,
    on: 'click',
    keyToHide: 'Escape',
  };

  // 用户定义JS结束

  /**
   * 设置必要的弹出层信息
   * @param {string} triggerSelector 点谁弹出（选择器）
   * @param {string} popupSelector 弹出谁（选择器）
   * @param {Object} custom 用户设置
   */
  function boot(triggerSelector, popupSelector, custom = {}) {
    // 拿到trigger和popup元素对象
    trigger = document.querySelector(triggerSelector);
    popup = document.querySelector(popupSelector);

    // 加载用户设置
    loadConfig(custom);

    // 准备Popup
    initPopup();

    // 准备遮罩
    initMask();

    // 绑定打开相关事件
    bindOpen();

    // 绑定关闭相关事件
    bindClose();
  }

  /**
   * 加载用户设置
   */
  function loadConfig(custom) {
    // 将用户设置和默认设置合并起来，存到全文变量中方便通篇调用
    config = Object.assign({}, defaultConfig, custom);
  }

  /**
   * 绑定打开相关事件
   *
   * 如：
   * 设置Popup的可见性
   * 定位Popup到合适的位置
   */
  function bindOpen() {
    trigger.addEventListener(config.on, () => {
      // 显示Popup和遮罩
      setVisibility(true);

      // 定位Popup到合适的位置
      repositionPopup(config.position, config.offsetY, config.offsetX);
    });
  }

  /**
   * 绑定关闭相关事件
   *
   * 如：
   * 设置Popup的可见性
   * 绑定关闭快捷键
   */
  function bindClose() {
    // 当遮罩被点击时
    mask.addEventListener('click', () => {
      // 隐藏Popup和遮罩
      setVisibility(false);
    });

    // 如果按了快捷键"Escape"
    window.addEventListener('keyup', (e) => {
      // 就隐藏Popup和遮罩
      if (e.key === config.keyToHide)
        setVisibility(false);
    });
  }

  /**
   * 设置是否可见
   * @param {boolean} show true为显示，false为隐藏
   */
  function setVisibility(show = false) {
    // 同时显示或隐藏Popup和遮罩
    popup.hidden = mask.hidden = !show;
  }

  /**
   * 初始化Popup元素
   */
  function initPopup() {
    // Popup一开始不应该显示
    popup.hidden = true;
    // 添加插件专属类，这样就可以和插件自带的CSS接应配合
    popup.classList.add('biao-popup');
  }

  /**
   * 初始化遮罩
   */
  function initMask() {
    // 造个新元素
    mask = document.createElement('div');
    // 加个插件类
    mask.classList.add('biao-mask');
    // 默认隐藏
    mask.hidden = true;
    // 追加到body最后
    document.body.appendChild(mask);
  }

  /**
   * 定位Popup
   *
   * 由于Popup的初始位置往往很奇怪，
   * 所以每个Popup在打开时都应该调整位置
   * @param {string} position 支持的位置有：
   *    center|top|bottom|left|right|top-left|top-right|bottom-left|bottom-right
   * @param yOffset 标准定位后的纵向偏移，单位：px
   * @param xOffset 标准定位后的横向偏移，单位：px
   */
  function repositionPopup(position = 'center', yOffset = 0, xOffset = 0) {
    // 获取浏览器窗口的尺寸
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    // 获取元素本身的尺寸
    let width = popup.offsetWidth;
    let height = popup.offsetHeight;
    // 缓存style，方便调用
    let style = popup.style;

    // 如果位置不是"xxx-xxx"的形式，而仅仅是"xxx"
    if (!position.includes('-')) {
      // 如果仅指定横向
      if (position == 'left' || position == 'right')
        position += '-centery'; // 纵向就默认居中，变成"xxx-centery"
      // 如果仅指定纵向
      else if (position == 'top' || position == 'bottom')
        position += '-centerx'; // 横向就默认居中，变成"xxx-centerx"
      else // 否则就全都居中，这其中就包含"center"
        position = 'centerx-centery';
    }

    // 是否横向居中
    if (position.includes('centerx'))
      style.left = windowWidth / 2 - width / 2 + xOffset + 'px';

    // 是否纵向居中
    if (position.includes('centery'))
      style.top = windowHeight / 2 - height / 2 + yOffset + 'px';

    // 是否贴在顶部
    if (position.includes('top'))
      style.top = yOffset + 'px';

    // 是否贴在底部
    if (position.includes('bottom'))
      style.bottom = yOffset + 'px';

    // 是否贴在左边
    if (position.includes('left'))
      style.left = xOffset + 'px';

    // 是否贴在右边
    if (position.includes('right'))
      style.right = xOffset + 'px';
  }
})();