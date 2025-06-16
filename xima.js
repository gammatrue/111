

// 获取响应状态码
const resStatus = $response.status || $response.statusCode;

// 如果响应状态码不是 200，则记录日志并直接返回，不进行处理
if (resStatus !== 200) {
    console.log(`[喜马拉雅] 错误: HTTP响应状态码不为200 (${resStatus})`);
    $done({});
} else {
    try {
        let body = $response.body;
        let obj = JSON.parse(body);


        // --- (1) 解锁所有 VIP 音效 (soundEffectInfo.soundEffects) ---
        if (obj.data && obj.data.soundEffectInfo && obj.data.soundEffectInfo.soundEffects) {
            obj.data.soundEffectInfo.soundEffects.forEach(effect => {
                if (effect.isNeedVip === true) { // 仅修改需要VIP的音效
                    effect.isNeedVip = false;
                    effect.isAuthorized = true;
                    effect.isNewProductFree = true;
                    console.log(`[喜马拉雅] 解锁音效: ${effect.name}`);
                }
            });
        }

        // --- (2) 解锁所有 VIP 助眠音效 (sleepEffectPanel.effectList) ---
        if (obj.data && obj.data.sleepEffectPanel && obj.data.sleepEffectPanel.effectList) {
            obj.data.sleepEffectPanel.effectList.forEach(effect => {
                if (effect.isNeedVip === true) { // 仅修改需要VIP的助眠音效
                    effect.isNeedVip = false;
                    effect.isAuthorized = true;
                    effect.isNewProductFree = true;
                    console.log(`[喜马拉雅] 解锁助眠音效: ${effect.name}`);
                }
            });
            // 尝试将 sleepEffectPanel 的 timeLimitFree 设置为 true，增加可用性
            obj.data.sleepEffectPanel.isTimeLimitFree = true;
            console.log(`[喜马拉雅] 助眠音效时间限制免费已启用`);
        }


        // 将修改后的对象转回 JSON 字符串
        body = JSON.stringify(obj);

        // 根据 Quantumult X 环境返回 bodyBytes 或 body
        if (typeof $task !== "undefined") {
            // Quantumult X 环境
            const encoder = new TextEncoder();
            const uint8Array = encoder.encode(body);
            $done({ bodyBytes: uint8Array.buffer });
        } else {
            // 其他环境 (如 Surge, Loon)
            $done({ body });
        }

    } catch (e) {
        console.log(`[喜马拉雅] 脚本执行出错: ${e.message}`);
        $notification.post("喜马拉雅解锁", "脚本错误", e.message); // 发送通知提醒
        $done({});
    }
}
