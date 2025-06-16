
// 获取响应状态码
const resStatus = $response.status || $response.statusCode;

// 如果响应状态码不是 200，则记录日志并直接返回，不进行处理
if (resStatus !== 200) {
    console.log(`[喜马拉雅] 错误: HTTP响应状态码不为200 (${resStatus})`);
    $done({});
} else {
    try {
        let obj = JSON.parse($response.body); // 直接解析响应体字符串

        console.log(`[喜马拉雅] 脚本开始处理响应...`);
        if (obj.data && obj.data.soundEffectInfo && Array.isArray(obj.data.soundEffectInfo.soundEffects)) {
            obj.data.soundEffectInfo.soundEffects.forEach(effect => {
                // 确保每个元素都是有效的对象，以防止潜在的错误
                if (typeof effect === 'object' && effect !== null) {
                    if (effect.isNeedVip === true) { // 仅修改明确需要VIP的音效
                        effect.isNeedVip = false;
                        effect.isAuthorized = true;
                        effect.isNewProductFree = true;
                        console.log(`[喜马拉雅] 解锁音效: ${effect.name || '未知音效'}`);
                    }
                }
            });
        } else {
            console.log(`[喜马拉雅] 未找到 soundEffectInfo.soundEffects 数组或格式不正确`);
        }


        // --- (3) 解锁所有 VIP 助眠音效 (sleepEffectPanel.effectList) ---
        // 检查路径是否存在且为数组
        if (obj.data && obj.data.sleepEffectPanel && Array.isArray(obj.data.sleepEffectPanel.effectList)) {
            obj.data.sleepEffectPanel.effectList.forEach(effect => {
                // 确保每个元素都是有效的对象，以防止潜在的错误
                if (typeof effect === 'object' && effect !== null) {
                    if (effect.isNeedVip === true) { // 仅修改明确需要VIP的助眠音效
                        effect.isNeedVip = false;
                        effect.isAuthorized = true;
                        effect.isNewProductFree = true;
                        console.log(`[喜马拉雅] 解锁助眠音效: ${effect.name || '未知助眠音效'}`);
                    }
                }
            });
            // 尝试将 sleepEffectPanel 的 isTimeLimitFree 设置为 true，增加可用性
            obj.data.sleepEffectPanel.isTimeLimitFree = true;
            console.log(`[喜马拉雅] 助眠音效时间限制免费已启用`);
        } else {
            console.log(`[喜马拉雅] 未找到 sleepEffectPanel.effectList 数组或格式不正确`);
        }

        let modifiedBody = JSON.stringify(obj);

        $done({ body: modifiedBody });
        console.log(`[喜马拉雅] 脚本处理完成。`);

    } catch (e) {
        // 如果 JSON 解析或脚本执行出错，记录错误并发送通知
        console.log(`[喜马拉雅] 脚本执行出错: ${e.message}`);
        $notification.post("喜马拉雅解锁", "脚本执行失败", e.message);
        $done({}); // 确保即使出错也完成请求，避免卡住
    }
}
