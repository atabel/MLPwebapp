class UploadPrimaCtrl extends Monocle.Controller

    elements:
        "#url-input": "urlInput"

    events:
        "tap button#upload-url-btn": "onTapUpload"

    onTapUpload: () =>
        url = @urlInput.val()
        if url and App.Utils.isUrl url
            App.Services.uploadPrimaPicture url
            @urlInput.val ''
        else
            Lungo.Notification.error(t("error"), t("invalid-url"), "warning-sign", 3);


__Controller.UploadPrima = new UploadPrimaCtrl "section#section-upload-prima"