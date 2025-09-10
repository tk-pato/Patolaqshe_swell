<?php
if (! defined('ABSPATH')) exit;

// メイン（バストアップ）と下段3カードはフィルターで差し替え可能
$main = apply_filters('ptl_service_feature_main', [
    'title' => 'BUST UP',
    'desc'  => '姿勢・筋膜・リンパのアプローチで土台から美しく。お一人お一人の体質に合わせて無理なく導きます。（ダミーテキスト）',
    'url'   => home_url('/service/bust-up/'),
    'img'   => '', // 未指定時はプレースホルダー
]);

$cards = apply_filters('ptl_service_feature_cards', [
    ['label' => 'FACIAL',    'url' => home_url('/service/facial/'),    'img' => ''],
    ['label' => 'SLIMMING',  'url' => home_url('/service/slimming/'),  'img' => ''],
    ['label' => 'BODY CARE', 'url' => home_url('/service/bodycare/'),  'img' => ''],
]);

function ptl_svg_ph_box($ratio = '4/5')
{
    // シンプルなグレープレースホルダー（SVG）を返す
    $svg  = '<svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="ptl-phsvg" aria-hidden="true">';
    $svg .= '<defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#EAEAEA"/><stop offset="100%" stop-color="#D8D8D8"/></linearGradient></defs>';
    $svg .= '<rect x="0" y="0" width="1200" height="1200" fill="url(#g)"/>';
    $svg .= '<rect x="40" y="40" width="1120" height="1120" fill="none" stroke="#CFCFCF" stroke-width="4" stroke-dasharray="12 10"/>';
    $svg .= '</svg>';
    return $svg;
}
?>

<section id="service-feature" class="ptl-section ptl-serviceFeature">
    <div class="ptl-section__inner">
        <!-- 上段：大きなバストアップ（左：画像 / 右：テキスト） -->
        <div class="ptl-serviceFeature__hero">
            <div class="ptl-serviceFeature__heroMedia" style="--ratio: 16/9">
                <?php if (!empty($main['url'])): ?>
                    <a href="<?php echo esc_url($main['url']); ?>" class="ptl-serviceFeature__heroLink" aria-label="<?php echo esc_attr($main['title'] ?: 'BUST UP'); ?>">
                        <?php if (!empty($main['img'])): ?>
                            <img src="<?php echo esc_url($main['img']); ?>" alt="" loading="lazy" decoding="async">
                        <?php else: ?>
                            <?php echo ptl_svg_ph_box('16/9'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
                            ?>
                        <?php endif; ?>
                    </a>
                <?php else: ?>
                    <?php if (!empty($main['img'])): ?>
                        <img src="<?php echo esc_url($main['img']); ?>" alt="" loading="lazy" decoding="async">
                    <?php else: ?>
                        <?php echo ptl_svg_ph_box('16/9'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
                        ?>
                    <?php endif; ?>
                <?php endif; ?>
            </div>
            <div class="ptl-serviceFeature__heroBody">
                <h2 class="ptl-serviceFeature__title"><?php echo esc_html($main['title'] ?: 'BUST UP'); ?></h2>
                <p class="ptl-serviceFeature__desc"><?php echo esc_html($main['desc'] ?: 'Description'); ?></p>
                <?php if (!empty($main['url'])): ?>
                    <a class="ptl-arrowLink" href="<?php echo esc_url($main['url']); ?>">
                        <span class="ptl-arrowLink__label">VIEW MENU</span>
                        <span class="ptl-arrowLink__arrow" aria-hidden="true">→</span>
                    </a>
                <?php endif; ?>
            </div>
        </div>

        <!-- 下段：小さめの3カード（フェイシャル・痩身・ボディケア） -->
        <div class="ptl-serviceFeature__grid">
            <?php foreach ($cards as $c): $href = $c['url'] ?? '#'; ?>
                <a class="ptl-serviceFeature__card" href="<?php echo esc_url($href); ?>">
                    <span class="ptl-serviceFeature__cardMedia" style="--ratio: 4/3">
                        <?php if (!empty($c['img'])): ?>
                            <img src="<?php echo esc_url($c['img']); ?>" alt="" loading="lazy" decoding="async">
                        <?php else: ?>
                            <?php echo ptl_svg_ph_box('4/3'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
                            ?>
                        <?php endif; ?>
                    </span>
                    <span class="ptl-serviceFeature__cardLabel"><?php echo esc_html($c['label'] ?? ''); ?></span>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>