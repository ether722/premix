import React, { useEffect } from 'react'

export default function () {
    useEffect(() => {
        const record: any = document.querySelector(".record");
        record.addEventListener("click", async () => {
            const videoStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
            });
            const Type = MediaRecorder.isTypeSupported("video/webm;codecs=h264");
            const typeVal = Type ? "video/webm;codecs=h264" : "video/webm";

            const media = new MediaRecorder(videoStream, { mimeType: typeVal });
            let datas: any = [];
            media.addEventListener("dataavailable", (e) => {
                datas.push(e.data);
            });

            media.addEventListener("stop", () => {
                const blob = new Blob(datas, { type: datas[0].type });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "media.mp4";
                link.click();
            });
            media.start();
        });
    }, [])

    return (
        <>
            <div className="record">录制屏幕</div>
        </>
    )
}
