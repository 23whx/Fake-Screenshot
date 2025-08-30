import React, { useState, useRef } from 'react';
import HeroSelector from './HeroSelector.jsx';
import SubtitleInput from './SubtitleInput.jsx';
import CanvasPreview from './CanvasPreview.jsx';
import Controls from './Controls.jsx';
import { Download, Settings, Sparkles, Sun, Moon, Globe } from 'lucide-react';

const ScreenshotGenerator = () => {
  const [selectedHero, setSelectedHero] = useState('jobs');
  const [customImage, setCustomImage] = useState(null);
  const [subtitle, setSubtitle] = useState('如果你不够优秀\n人脉是不值钱的\n它不是追求来的\n而是吸引来的\n只有等价的交换\n才能得到合理的帮助\n虽然听起来很冷\n但这是事实');
  const [subtitleType, setSubtitleType] = useState('chinese');
  const [fontSize, setFontSize] = useState(36);
  const [lineHeight, setLineHeight] = useState(1.5); // 行高仍保留内部状态用于渲染，但不在UI中展示
  const [textAlign, setTextAlign] = useState('center');
  const [verticalPosition, setVerticalPosition] = useState('bottom');
  const [fontFamily, setFontFamily] = useState('default');
  const [textColor, setTextColor] = useState('#ffffff');
  // 移除水印相关状态
  const [showControls, setShowControls] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const canvasRef = useRef(null);

  // 语言配置
  const languages = {
    en: {
      title: 'Subtitle Screenshot Generator',
      subtitle: '"If there\'s a screenshot, it must be true"',
      styleSettings: 'Style Settings',
      saveImage: 'Save Image',
      selectHero: 'Select Celebrity Background',
      uploadImage: 'Upload Custom Image',
      subtitleContent: 'Subtitle Content',
      realTimePreview: 'Real-time Preview',
    },
    zh: {
      title: '字幕截图生成器',
      subtitle: '"都有截图了一定是真的"',
      styleSettings: '样式设置',
      saveImage: '保存图片',
      selectHero: '选择名人背景',
      uploadImage: '上传本机图片',
      subtitleContent: '台词内容',
      realTimePreview: '实时预览',
    },
    ja: {
      title: '字幕スクリーンショット生成器',
      subtitle: '"スクリーンショットがあれば、それは真実に違いない"',
      styleSettings: 'スタイル設定',
      saveImage: '画像を保存',
      selectHero: '有名人の背景を選択',
      uploadImage: 'カスタム画像をアップロード',
      subtitleContent: '字幕内容',
      realTimePreview: 'リアルタイムプレビュー',
    }
  };

  const t = languages[language];

  const handleExport = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const link = document.createElement('a');
      link.download = 'screenshot.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // 移除水印相关处理函数

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* 头部 */}
      <header className={`backdrop-blur-lg border-b sticky top-0 z-40 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{t.title}</h1>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* 语言选择 */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 appearance-none pr-8 ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
                  }`}
                >
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                  <option value="ja">日本語</option>
                </select>
                <Globe className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
              
              {/* 昼夜模式切换 */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`inline-flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
              
              {/* 样式设置 */}
              <button
                onClick={() => setShowControls(!showControls)}
                className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Settings className="w-4 h-4 mr-2" />
                {t.styleSettings}
              </button>
              
              {/* 保存图片 */}
              <button
                onClick={handleExport}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <Download className="w-4 h-4 mr-2" />
                {t.saveImage}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 左侧控制面板 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 英雄选择 */}
            <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-lg transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-800/70 border-gray-700/50' 
                : 'bg-white/70 border-gray-200/50'
            }`}>
              <h2 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{t.selectHero}</h2>
              <HeroSelector
                selectedHero={selectedHero}
                onHeroChange={setSelectedHero}
                customImage={customImage}
                onCustomImageChange={setCustomImage}
                isDarkMode={isDarkMode}
                language={language}
              />
            </div>

            {/* 字幕输入 */}
            <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-lg transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-800/70 border-gray-700/50' 
                : 'bg-white/70 border-gray-200/50'
            }`}>
              <h2 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{t.subtitleContent}</h2>
              <SubtitleInput
                subtitle={subtitle}
                onSubtitleChange={setSubtitle}
                subtitleType={subtitleType}
                onSubtitleTypeChange={setSubtitleType}
                isDarkMode={isDarkMode}
                language={language}
              />
            </div>

            {/* 水印控制部分已移除 */}

            {/* 高级控制 */}
            {showControls && (
              <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-lg animate-slide-up transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/70 border-gray-700/50' 
                  : 'bg-white/70 border-gray-200/50'
              }`}>
                <h2 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>高级设置</h2>
                <Controls
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                  fontFamily={fontFamily}
                  onFontFamilyChange={setFontFamily}
                  textColor={textColor}
                  onTextColorChange={setTextColor}
                  isDarkMode={isDarkMode}
                  language={language}
                />
              </div>
            )}
          </div>

          {/* 右侧预览区 - 粘性定位 */}
          <div className="lg:col-span-3">
            <div className={`sticky top-28 lg:top-28 md:top-24 sm:top-20 backdrop-blur-sm rounded-2xl p-6 border shadow-lg transition-all duration-300 hover:shadow-xl ${
              isDarkMode 
                ? 'bg-gray-800/70 border-gray-700/50' 
                : 'bg-white/70 border-gray-200/50'
            }`}>
              <h2 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {t.realTimePreview}
              </h2>
              <CanvasPreview
                ref={canvasRef}
                selectedHero={selectedHero}
                customImage={customImage}
                subtitle={subtitle}
                subtitleType={subtitleType}
                fontSize={fontSize}
                lineHeight={lineHeight}
                fontFamily={fontFamily}
                textColor={textColor}
                isDarkMode={isDarkMode}
                language={language}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 水印弹窗已移除 */}
    </div>
  );
};

export default ScreenshotGenerator;
