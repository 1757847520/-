// 移动端检测和重定向功能
function isMobileDevice() {
    // 检测屏幕宽度 - 优先检测，因为这是桌面浏览器移动端模拟模式下最可靠的指标
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth < 768) {
        return true;
    }
    
    // 检测设备UA字符串
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())) {
        return true;
    }
    
    // 检测触摸事件支持
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
        return true;
    }
    
    // 检查是否在浏览器的开发者工具移动端模拟模式下
    // 某些浏览器会添加特殊的类或属性到body元素
    if (document.body.classList.contains('mobile-simulate') || document.documentElement.hasAttribute('mobile-simulate')) {
        return true;
    }
    
    return false;
}

// 检查用户是否已选择不使用移动端
function shouldRedirect() {
    const cookie = document.cookie.match(/(^|;)\s*mobile_redirect_optout\s*=\s*([^;]+)/);
    return !cookie || cookie[2] !== 'true';
}

// 检查设备类型并执行相应的页面切换
function checkAndRedirect() {
    const isMobile = isMobileDevice();
    const currentPath = window.location.pathname;
    const currentFilename = currentPath.split('/').pop();
    const isOnMobilePage = currentFilename.startsWith('mobile-');
    
    // 如果用户已选择不使用移动端，只在用户明确切换时才处理
    if (!shouldRedirect()) {
        return;
    }
    
    // 移动设备 → 确保在移动页面
    if (isMobile && !isOnMobilePage) {
        // 重定向到对应的移动端页面
        // 特殊处理：如果是index.html或根路径，重定向到mobile-index.html
        if (currentFilename === '' || currentFilename === 'index.html') {
            window.location.href = 'mobile-index.html';
        } else {
            const mobileFilename = 'mobile-' + currentFilename;
            window.location.href = mobileFilename;
        }
    }
    // 桌面设备 → 确保在桌面页面
    else if (!isMobile && isOnMobilePage) {
        // 重定向到对应的桌面页面
        const desktopFilename = currentFilename.replace('mobile-', '');
        
        // 特殊处理：如果替换后是index.html，直接重定向
        // 否则重定向到index.html（根据需求，桌面版重定向文件错误应该重定向到index文件）
        window.location.href = 'index.html';
    }
}

// 允许用户切换到桌面版
function switchToDesktop() {
    // 设置cookie，7天内不再自动重定向
    document.cookie = 'mobile_redirect_optout=true; expires=' + new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString() + '; path=/';
    
    // 根据需求，切换到桌面版时直接重定向到index.html
    window.location.href = 'index.html';
}

// 允许用户切换到移动端
function switchToMobile() {
    // 清除cookie，允许自动重定向
    document.cookie = 'mobile_redirect_optout=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // 立即触发重定向逻辑
    checkAndRedirect();
}

// 页面加载时检测并可能重定向
window.addEventListener('load', function() {
    checkAndRedirect();
});

// 窗口大小改变时重新检测
window.addEventListener('resize', function() {
    // 延迟执行，确保浏览器已经完成尺寸调整
    setTimeout(checkAndRedirect, 300);
});

// 页面加载完成后立即检测（针对DOMContentLoaded事件）
document.addEventListener('DOMContentLoaded', function() {
    checkAndRedirect();
});

// 额外添加一个周期性检测，确保在各种情况下都能正确重定向
setInterval(function() {
    checkAndRedirect();
}, 2000);

// 路径验证和错误处理函数
function validateAndRedirect(linkElement) {
    // 获取链接目标
    const targetHref = linkElement.getAttribute('href');
    
    // 如果是锚点链接（#开头），直接返回，不处理
    if (targetHref.startsWith('#')) {
        return;
    }
    
    // 验证目标路径
    fetch(targetHref, {
        method: 'HEAD',
        mode: 'no-cors'
    }).then(response => {
        // 如果请求成功（不考虑跨域问题），允许正常跳转
        // 对于跨域请求，我们无法获取准确的状态码，所以直接允许跳转
        // 这里主要处理同源请求的情况
        return true;
    }).catch(error => {
        // 请求失败，可能是404或其他错误
        console.warn('路径验证失败，重定向到主页:', targetHref);
        // 阻止默认跳转
        event.preventDefault();
        // 重定向到正确的主页
        window.location.href = '/index.html';
        return false;
    });
}

// 为所有logo链接添加路径验证
function addLogoLinkValidation() {
    const logoLinks = document.querySelectorAll('a.logo');
    logoLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // 阻止默认跳转，先验证
            event.preventDefault();
            
            // 获取当前位置
            const currentLocation = window.location.href;
            const currentPath = window.location.pathname;
            
            // 如果当前已经在主页，不需要跳转
            if (currentPath === '/' || currentPath === '/index.html') {
                return;
            }
            
            // 直接重定向到主页，使用绝对路径
            window.location.href = '/index.html';
        });
    });
}

// 添加全局404错误处理
window.addEventListener('error', function(event) {
    // 检测资源加载错误
    if (event.target.tagName === 'IMG' || event.target.tagName === 'SCRIPT' || event.target.tagName === 'LINK') {
        console.warn('资源加载错误:', event.target.src || event.target.href);
        // 这里可以添加资源加载错误的处理逻辑
    }
});

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加logo链接验证
    addLogoLinkValidation();
    // 移动端菜单功能 - 仅在元素存在时执行
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && closeMenuBtn && mobileNav) {
        // 打开移动端菜单
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
        });

        // 关闭移动端菜单
        closeMenuBtn.addEventListener('click', function() {
            mobileNav.classList.remove('active');
        });

        // 点击移动端导航链接后关闭菜单
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
            });
        });
    }

    // 滚动到指定部分功能
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // 为快速访问卡片添加点击事件
    const accessCards = document.querySelectorAll('.access-card');
    accessCards.forEach(card => {
        card.addEventListener('click', function() {
            const sectionId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            scrollToSection(sectionId);
        });
    });

    // 设计亮点部分的导航和高亮切换 - 仅在元素存在时执行
    const highlightDots = document.querySelectorAll('.highlight-dot');
    const highlightSections = document.querySelectorAll('.highlight-section');

    if (highlightDots.length > 0 && highlightSections.length > 0) {
        // 点击导航点切换高亮部分
        highlightDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                
                // 移除所有激活状态
                highlightDots.forEach(d => d.classList.remove('active'));
                highlightSections.forEach(s => s.classList.remove('active'));
                
                // 添加当前激活状态
                this.classList.add('active');
                document.getElementById(targetId).classList.add('active');
            });
        });

        // 设计亮点自动切换（可选）
        let currentHighlightIndex = 0;
        const autoSwitchInterval = 5000; // 5秒切换一次
        
        function autoSwitchHighlight() {
            // 移除所有激活状态
            highlightDots.forEach(d => d.classList.remove('active'));
            highlightSections.forEach(s => s.classList.remove('active'));
            
            // 计算下一个索引
            currentHighlightIndex = (currentHighlightIndex + 1) % highlightSections.length;
            
            // 添加当前激活状态
            highlightDots[currentHighlightIndex].classList.add('active');
            highlightSections[currentHighlightIndex].classList.add('active');
        }
        
        // 启动自动切换
        let autoSwitchTimer = setInterval(autoSwitchHighlight, autoSwitchInterval);
        
        // 鼠标悬停在设计亮点上时暂停自动切换
        const highlightsContainer = document.querySelector('#highlights');
        if (highlightsContainer) {
            highlightsContainer.addEventListener('mouseenter', function() {
                clearInterval(autoSwitchTimer);
            });
            
            highlightsContainer.addEventListener('mouseleave', function() {
                autoSwitchTimer = setInterval(autoSwitchHighlight, autoSwitchInterval);
            });
        }
    }

    // 元素进入视口时的淡入动画 - 仅在元素存在时执行
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        function checkFadeElements() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight * 0.8) {
                    element.classList.add('visible');
                }
            });
        }
        
        // 初始检查
        checkFadeElements();
        
        // 滚动时检查
        window.addEventListener('scroll', checkFadeElements);
    }

    // 导航栏滚动效果 - 向下滚动收起，向上滚动显示 - 仅在元素存在时执行
    const header = document.getElementById('header');
    if (header) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // 向下滚动且超过100px，收起导航栏
                header.style.transform = 'translateY(-100%)';
            } else {
                // 向上滚动或未超过100px，显示导航栏
                header.style.transform = 'translateY(0)';
            }
            
            // 更新滚动位置
            lastScrollTop = scrollTop;
            
            // 调整导航栏样式
            if (scrollTop > 100) {
                header.style.padding = '15px 0';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '20px 0';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            }
        });
        
        // 确保导航栏有过渡效果
        header.style.transition = 'transform 0.3s ease-in-out, padding 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
    }

    // 平滑滚动到锚点 - 已在移动端页面单独实现，避免冲突
    const pageLinks = document.querySelectorAll('a[href^="#"]:not(.mobile-nav-link)');
    pageLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            scrollToSection(targetId.substring(1));
        });
    });

    // 导航链接高亮功能 - 仅在元素存在时执行
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    if (navLinks.length > 0 && sections.length > 0) {
        function highlightNavLink() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', highlightNavLink);

        // 初始化导航链接高亮
        highlightNavLink();
    }

    // 添加加载动画
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);

    // 为卡片添加悬停效果增强 - 仅在元素存在时执行
    const cards = document.querySelectorAll('.access-card, .meaning-card, .feature-card, .feasibility-card, .ethics-card, .team-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});