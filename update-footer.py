import os
import re

# 读取新的页脚模板
new_footer = '''    <!-- 页脚 -->
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
    </footer>'''

# 获取当前目录下所有HTML文件
html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# 遍历每个HTML文件
for file in html_files:
    print(f'Processing {file}...')
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 使用正则表达式替换旧的页脚
    updated_content = re.sub(r'(?s)<!-- 页脚 -->.*?</footer>', new_footer, content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print(f'Updated footer in {file}')

print('All files updated successfully!')