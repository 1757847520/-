const fs = require('fs');
const path = require('path');
const { default: imagemin } = require('imagemin');
const { default: imageminWebp } = require('imagemin-webp');

// 图片目录
const imageDir = './';

// 支持的图片格式
const supportedFormats = ['.png', '.jpg', '.jpeg'];

// 输出目录（这里直接覆盖原文件，或者可以指定新目录）
const outputDir = './';

async function compressImages() {
    try {
        // 读取目录中的所有文件
        const files = fs.readdirSync(imageDir);
        
        // 过滤出图片文件
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return supportedFormats.includes(ext);
        });
        
        console.log(`找到 ${imageFiles.length} 个图片文件需要处理:`);
        console.log(imageFiles.join('\n'));
        
        if (imageFiles.length === 0) {
            console.log('没有需要处理的图片文件');
            return;
        }
        
        // 创建输出目录（如果不存在）
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // 逐个处理图片文件
        for (const file of imageFiles) {
            console.log(`\n正在处理: ${file}`);
            
            const inputPath = path.join(imageDir, file);
            const outputPath = path.join(outputDir, `${path.basename(file, path.extname(file))}.webp`);
            
            // 读取原始文件大小
            const originalSize = fs.statSync(inputPath).size;
            
            // 压缩图片
            await imagemin([inputPath], {
                destination: outputDir,
                plugins: [
                    imageminWebp({
                        quality: 75, // 质量设置，1-100，这里设置为75以达到≥60%的压缩率
                        method: 6     // 压缩方法，0-6，值越高压缩率越高但速度越慢
                    })
                ]
            });
            
            // 计算压缩后的文件大小和压缩率
            const compressedSize = fs.statSync(outputPath).size;
            const compressionRatio = ((1 - compressedSize / originalSize) * 100).toFixed(2);
            
            console.log(`处理完成: ${outputPath}`);
            console.log(`原始大小: ${(originalSize / 1024).toFixed(2)} KB`);
            console.log(`压缩后大小: ${(compressedSize / 1024).toFixed(2)} KB`);
            console.log(`压缩率: ${compressionRatio}%`);
        }
        
        console.log('\n所有图片处理完成！');
        
    } catch (error) {
        console.error('处理图片时发生错误:', error);
    }
}

// 执行压缩
compressImages();