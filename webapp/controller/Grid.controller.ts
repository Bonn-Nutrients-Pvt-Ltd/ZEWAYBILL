import MessageToast from "sap/m/MessageToast";
import PDFViewer from "sap/m/PDFViewer";
import BusyIndicator from "sap/ui/core/BusyIndicator";
import Controller from "sap/ui/core/mvc/Controller";

/**
 * @namespace zirnview.controller
 */
export default class Grid extends Controller {

    public _PDFViewer: PDFViewer;

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {

    }

    public onClickTI(): void {
        let view = (this.byId("_IDGenSmartTable")! as any).getTable()
        let selectedIndex = view.getSelectedIndices();
        let fields = view.getContextByIndex(selectedIndex[0]).getProperty();
        let Bukrs = fields.Bukrs;
        let Billingdocno = fields.Billingdocno;

        var that = this;
        var formData = new FormData();
        formData.append("document", Billingdocno);
        formData.append("companycode", Bukrs);
        var url1 = "/sap/bc/http/sap/ZHTTP_PRINTFORM_NEW?";
        var url2 = "&print=";
        var url3 = "&doc=";
        var url4 = "&cc=";
        var geturlresult = url1 + url2 + 'stoOffice' + url3 + Billingdocno + url4 + Bukrs;
        var urlresult = url1 + url2 + 'stoOffice';
        $.ajax({
            url: geturlresult,
            method: "GET",
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result !== '' && result !== 'EX') {
                    BusyIndicator.show(0);
                    $.ajax({
                        url: urlresult,
                        method: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            if (result.includes("companycode")) {

                                MessageToast.show(result);
                                BusyIndicator.hide();
                                return;
                            }
                            //console.log(result)
                            if (result.includes("document")) {
                                MessageToast.show(result);
                                BusyIndicator.hide();
                                return;
                            }
                            if (result.includes("Document")) {
                                MessageToast.show(result);
                                BusyIndicator.hide();
                                return;
                            }
                            if (result.includes("invoice is not released yet")) {
                                MessageToast.show(result);
                                BusyIndicator.hide();
                                return;
                            }

                            var decodedPdfContent = atob(result);
                            var byteArray = new Uint8Array(decodedPdfContent.length);
                            for (var i = 0; i < decodedPdfContent.length; i++) {
                                byteArray[i] = decodedPdfContent.charCodeAt(i);
                            }
                            var blob = new Blob([byteArray.buffer], {
                                type: 'application/pdf'
                            });
                            var _pdfurl = URL.createObjectURL(blob);

                            if (!that._PDFViewer) {
                                that._PDFViewer = new PDFViewer({
                                    width: "auto",
                                    source: _pdfurl
                                });
                            } else {
                                that._PDFViewer = new PDFViewer({
                                    width: "auto",
                                    source: _pdfurl
                                });
                            }
                            BusyIndicator.hide();
                            that._PDFViewer.open();
                        },
                        error: function (error) {
                            BusyIndicator.hide();
                        }
                    });
                }
                else {
                    MessageToast.show('Kindly Select an Correct Tax Invoice', { duration: 2000 });
                }
            }
        });

    }

    public onClickETI(): void {
        let view = (this.byId("_IDGenSmartTable")! as any).getTable()
        let selectedIndex = view.getSelectedIndices();
        let fields = view.getContextByIndex(selectedIndex[0]).getProperty();
        let Bukrs = fields.Bukrs;
        let Billingdocno = fields.Billingdocno;
        var that = this;
        var formData = new FormData();
        formData.append("document", Billingdocno);
        formData.append("companycode", Bukrs);
        var url1 = "/sap/bc/http/sap/ZHTTP_PRINTFORM_NEW?";
        var url2 = "&print=";
        var url3 = "&doc=";
        var url4 = "&cc=";
        var geturlresult = url1 + url2 + 'expoOffice' + url3 + Billingdocno + url4 + Bukrs;
        var urlresult = url1 + url2 + 'expoOffice';
        $.ajax({
            url: geturlresult,
            method: "GET",
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {

                if (result == 'EX') {
                    BusyIndicator.show(0);
                    $.ajax({
                        url: urlresult,
                        method: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            if (result.includes("companycode")) {

                                MessageToast.show(result);
                                BusyIndicator.hide();
                                return;
                            }

                            if (result.includes("document")) {
                                MessageToast.show(result);
                                BusyIndicator.hide();
                                return;
                            }

                            if (result.includes("Document")) {
                                MessageToast.show(result);
                                BusyIndicator.hide();
                                return;
                            }
                            if (result.includes("invoice is not released yet")) {
                                MessageToast.show(result);
                                BusyIndicator.hide();
                                return;
                            }

                            var decodedPdfContent = atob(result);
                            var byteArray = new Uint8Array(decodedPdfContent.length);
                            for (var i = 0; i < decodedPdfContent.length; i++) {
                                byteArray[i] = decodedPdfContent.charCodeAt(i);
                            }
                            var blob = new Blob([byteArray.buffer], {
                                type: 'application/pdf'
                            });
                            var _pdfurl = URL.createObjectURL(blob);

                            if (!that._PDFViewer) {
                                that._PDFViewer = new PDFViewer({
                                    width: "auto",
                                    source: _pdfurl
                                });
                            } else {
                                that._PDFViewer = new PDFViewer({
                                    width: "auto",
                                    source: _pdfurl
                                });
                            }
                            BusyIndicator.hide();
                            that._PDFViewer.open();
                        },
                        error: function (error) {
                            BusyIndicator.hide();
                        }
                    });
                }
                else {
                    MessageToast.show('Kindly Select an Distribution chanel EX For Export Tax Invoice', { duration: 2000 });
                }
            }
        });

    }


    public onClickDC(): void {
        let view = (this.byId("_IDGenSmartTable")! as any).getTable()
        let selectedIndex = view.getSelectedIndices();
        let fields = view.getContextByIndex(selectedIndex[0]).getProperty();
        let Bukrs = fields.Bukrs;
        let Billingdocno = fields.Billingdocno;
        var that = this;
        var formData = new FormData();
        formData.append("document", Billingdocno);
        formData.append("companycode", Bukrs);
        var url1 = "/sap/bc/http/sap/ZHTTP_PRINTFORM_NEW?";
        var url2 = "&print=";
        var url3 = "&doc=";
        var url4 = "&cc=";
        var geturlresult = url1 + url2 + 'DCOffice' + url3 + Billingdocno + url4 + Bukrs;
        var urlresult = url1 + url2 + 'DCOffice';
        $.ajax({
            url: geturlresult,
            method: "GET",
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {

                if (result === 'JDC' || result === 'JVR' || result === 'JSN') {
                    BusyIndicator.show(0);
                    $.ajax({
                        url: urlresult,
                        method: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            if (result.includes("companycode")) {

                                MessageToast.show(result);
                                BusyIndicator.hide();
                                return;
                            }
                            //console.log(result)
                            if (result.includes("document")) {
                                MessageToast.show(result);
                                BusyIndicator.hide();
                                return;
                            }
                            if (result.includes("Document")) {
                                MessageToast.show(result);
                                BusyIndicator.hide();
                                return;
                            }

                            var decodedPdfContent = atob(result);
                            var byteArray = new Uint8Array(decodedPdfContent.length);
                            for (var i = 0; i < decodedPdfContent.length; i++) {
                                byteArray[i] = decodedPdfContent.charCodeAt(i);
                            }
                            var blob = new Blob([byteArray.buffer], {
                                type: 'application/pdf'
                            });
                            var _pdfurl = URL.createObjectURL(blob);

                            if (!that._PDFViewer) {
                                that._PDFViewer = new PDFViewer({
                                    width: "auto",
                                    source: _pdfurl
                                });
                            } else {
                                that._PDFViewer = new PDFViewer({
                                    width: "auto",
                                    source: _pdfurl
                                });
                            }
                            BusyIndicator.hide();
                            that._PDFViewer.open();
                        },
                        error: function (error) {
                            BusyIndicator.hide();
                        }
                    });
                }
                else {
                    MessageToast.show('Kindly Select an invoice type JDC ,JVR ,JSN for Delivery Challan Invoice', { duration: 2000 });
                }
            }
        });
    }
}