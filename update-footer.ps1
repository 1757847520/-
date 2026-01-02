# 读取新的页脚模板
$footerTemplate = @"
    <!-- 页脚 -->
    <footer class="new-footer">
        <div class="container">
            <div class="footer-main">
                <div class="footer-logo-section">
                    <div class="new-footer-logo">
                        <img src="logo.png" alt="莲藕摆渡" class="logo-img footer-logo">
                        莲藕摆渡 莲藕摆渡
                    </div>
                    <p class="footer-mission">以心为桥，渡人重生。专注为重返社会人士提供全周期心理赋能与社会融入服务。</p>
                </div>
                
                <div class="footer-info-section">
                    <div class="footer-company-info">
                        <h4>北京韦港科技集团有限公司</h4>
                        <div class="development-history">
                            <p>发展历程：</p>
                            <ul>
                                <li>2017年，北京市区级招商引资企业</li>
                                <li>2019年，入驻海南生态软件园</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="footer-contact-info">
                        <h4>联系方式</h4>
                        <div class="contact-details">
                            <p><strong>邮箱：</strong>venisle@venisle.com</p>
                            <p><strong>北京：</strong>010-86460668</p>
                            <p><strong>天津：</strong>022-66271007</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="new-copyright">
                &copy; 2025 莲藕摆渡一体化心理赋能平台. 保留所有权利.
            </div>
        </div>
    </footer>"@

# 获取所有HTML文件
$htmlFiles = Get-ChildItem -Path d:\产品信息官网 -Filter *.html

# 遍历每个HTML文件，更新页脚
foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # 替换旧的页脚内容
    $updatedContent = $content -replace '(?s)<!-- 页脚 -->.*?</footer>', $footerTemplate
    
    # 写入更新后的内容
    $updatedContent | Set-Content $file.FullName
    
    Write-Host "Updated footer in $($file.Name)"
}

Write-Host "All files updated successfully!"