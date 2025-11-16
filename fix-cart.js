// fix-cart.js - 外掛修復：讓購物車不被手機瀏覽器上方 UI 遮住
(() => {
  // 等 DOM 載入完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFix);
  } else {
    initFix();
  }

  function initFix() {
    const checkoutSide = document.getElementById('checkoutSide');
    if (!checkoutSide) return;

    // 注入 CSS（不改原始檔案）
    const style = document.createElement('style');
    style.textContent = `
      /* 手機安全區 + 滾動優化 */
      @supports (padding-top: env(safe-area-inset-top)) {
        #checkoutSide { padding-top: env(safe-area-inset-top); }
      }
      .cart-fix-header {
        position: sticky;
        top: 0;
        background: #fff;
        padding: 15px 20px;
        border-bottom: 1px solid #eee;
        z-index: 10;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      }
      .cart-fix-content {
        height: calc(100% - 60px);
        overflow-y: auto;
        padding: 15px 20px;
        -webkit-overflow-scrolling: touch;
      }
      #checkoutSide > *:not(.cart-fix-header):not(.cart-fix-content) {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // 觀察購物車開啟
    const observer = new MutationObserver(() => {
      if (checkoutSide.style.display === 'block') {
        applyCartFix();
      }
    });
    observer.observe(checkoutSide, { attributes: true, attributeFilter: ['style'] });

    // 手動觸發一次（如果已開啟）
    if (checkoutSide.style.display === 'block') applyCartFix();
  }

  function applyCartFix() {
    const checkoutSide = document.getElementById('checkoutSide');
    if (checkoutSide.dataset.fixed) return;
    checkoutSide.dataset.fixed = 'true';

    // 保留原始內容
    const originalContent = checkoutSide.innerHTML;

    // 重建結構
    checkoutSide.innerHTML = `
      <div class="cart-fix-header">
        <span>購物車</span>
        <button id="cartCloseBtnFix" style="background:none; border:none; font-size:1.5em; cursor:pointer; color:#999;">×</button>
      </div>
      <div class="cart-fix-content">
        ${originalContent}
      </div>
    `;

    // 綁定關閉按鈕
    const closeBtn = checkoutSide.querySelector('#cartCloseBtnFix');
    if (closeBtn) {
      closeBtn.onclick = () => {
        checkoutSide.style.display = 'none';
        document.getElementById('modalOverlay').style.display = 'none';
      };
    }

    // 重新綁定 + - 刪除（事件委派）
    checkoutSide.onclick = (e) => {
      const btn = e.target;
      const action = btn.getAttribute('onclick');
      if (!action) return;

      // 提取 changeQty(i, ±1) 或 removeItem(i)
      const match = action.match(/changeQty\((\d+),\s*([-\d]+)\)|removeItem\((\d+)\)/);
      if (!match) return;

      if (match[1] !== undefined) {
        const i = parseInt(match[1]);
        const d = parseInt(match[2]);
        window.changeQty(i, d);
      } else if (match[3] !== undefined) {
        const i = parseInt(match[3]);
        window.removeItem(i);
      }
    };
  }
})();
