/**
 * Split Link Hover Animation
 * テキストを1文字ずつ分割し、ホバー時に下から入れ替わるアニメーション
 * Angelica Michelle スタイル
 *
 * 適用対象:
 * - フッターナビ (.ptl-footer__nav-link)
 * - フッターサロンリンク (.ptl-footer__salon-link, .ptl-footer__salon-label)
 * - ヘッダー固定バーナビ (.l-fixHeader .c-gnav a)
 * - ヘッダーメインナビ (.l-header .c-gnav a)
 */
(function () {
  "use strict";

  var hasHover = window.matchMedia("(hover: hover)").matches;

  var SELECTORS = [
    ".ptl-footer__nav-link",
    ".ptl-footer__salon-link",
    "#gnav .menu-item > a",
    ".l-fixHeader .menu-item > a",
  ].join(", ");

  function initSplitLinks() {
    var targets = document.querySelectorAll(SELECTORS);
    if (!targets.length) return;

    targets.forEach(function (target) {
      // 既に適用済みならスキップ
      if (target.querySelector(".splitlink-wrap")) return;

      // 子要素がある場合はテキストノードのみ取得
      var text = "";
      target.childNodes.forEach(function (node) {
        if (node.nodeType === 3) text += node.textContent;
      });
      text = text.trim();
      if (!text) return;

      var chars = text.split("");
      var spans = chars
        .map(function (c) {
          return "<span>" + (c === " " ? "&nbsp;" : c) + "</span>";
        })
        .join("");

      // 元のテキストノードだけを置換（アイコン等の子要素は保持）
      var wrap = document.createElement("span");
      wrap.className = "splitlink-wrap";
      wrap.innerHTML =
        "<span class='splitlink-before'>" + spans + "</span>" +
        "<span class='splitlink-after'>" + spans + "</span>";

      // テキストノードを探して置換
      var replaced = false;
      target.childNodes.forEach(function (node) {
        if (node.nodeType === 3 && node.textContent.trim() && !replaced) {
          target.replaceChild(wrap, node);
          replaced = true;
        }
      });
      if (!replaced) {
        target.innerHTML = "";
        target.appendChild(wrap);
      }

      target.classList.add("splitlink-ready");
    });

    if (!hasHover) return;

    var readyTargets = document.querySelectorAll(".splitlink-ready");
    readyTargets.forEach(function (target) {
      var beforeChars = target.querySelectorAll(".splitlink-before span");
      var afterChars = target.querySelectorAll(".splitlink-after span");

      target.addEventListener("mouseenter", function () {
        beforeChars.forEach(function (span, i) {
          span.style.transitionDelay = i * 0.03 + "s";
          span.style.transform = "translateY(-100%)";
        });
        afterChars.forEach(function (span, i) {
          span.style.transitionDelay = i * 0.03 + "s";
          span.style.transform = "translateY(0%)";
        });
      });

      target.addEventListener("mouseleave", function () {
        beforeChars.forEach(function (span, i) {
          span.style.transitionDelay = i * 0.03 + "s";
          span.style.transform = "translateY(0%)";
        });
        afterChars.forEach(function (span, i) {
          span.style.transitionDelay = i * 0.03 + "s";
          span.style.transform = "translateY(100%)";
        });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSplitLinks);
  } else {
    initSplitLinks();
  }
})();
