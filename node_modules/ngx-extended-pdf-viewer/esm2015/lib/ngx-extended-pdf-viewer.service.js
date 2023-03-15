/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-extended-pdf-viewer.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// import { PDFDocumentProxy, PDFPageProxy } from './../../types/src/display/api.d';
import { NgxExtendedPdfViewerComponent } from './ngx-extended-pdf-viewer.component';
/**
 * @record
 */
export function FindOptions() { }
if (false) {
    /** @type {?|undefined} */
    FindOptions.prototype.highlightAll;
    /** @type {?|undefined} */
    FindOptions.prototype.matchCase;
    /** @type {?|undefined} */
    FindOptions.prototype.wholeWords;
    /** @type {?|undefined} */
    FindOptions.prototype.ignoreAccents;
    /** @type {?|undefined} */
    FindOptions.prototype.findMultipleSearchTexts;
    /** @type {?|undefined} */
    FindOptions.prototype.fuzzySearch;
}
/**
 * @record
 */
function DrawContext() { }
if (false) {
    /** @type {?} */
    DrawContext.prototype.ctx;
    /** @type {?} */
    DrawContext.prototype.canvas;
}
/**
 * @record
 */
export function PDFExportScaleFactor() { }
if (false) {
    /** @type {?|undefined} */
    PDFExportScaleFactor.prototype.width;
    /** @type {?|undefined} */
    PDFExportScaleFactor.prototype.height;
    /** @type {?|undefined} */
    PDFExportScaleFactor.prototype.scale;
}
export class NgxExtendedPdfViewerService {
    constructor() { }
    /**
     * @param {?} text
     * @param {?=} options
     * @return {?}
     */
    findMultiple(text, options = {}) {
        options = Object.assign({}, options, { findMultipleSearchTexts: true });
        /** @type {?} */
        const searchString = text.join('\n') + '\n';
        return this.find(searchString, options);
    }
    /**
     * @param {?} text
     * @param {?=} options
     * @return {?}
     */
    find(text, options = {}) {
        if (!NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized) {
            // tslint:disable-next-line:quotemark
            console.error("The PDF viewer hasn't finished initializing. Please call find() later.");
            return false;
        }
        else {
            /** @type {?} */
            const highlightAllCheckbox = (/** @type {?} */ (document.getElementById('findHighlightAll')));
            if (highlightAllCheckbox) {
                highlightAllCheckbox.checked = options.highlightAll || false;
            }
            /** @type {?} */
            const matchCaseCheckbox = (/** @type {?} */ (document.getElementById('findMatchCase')));
            if (matchCaseCheckbox) {
                matchCaseCheckbox.checked = options.matchCase || false;
            }
            /** @type {?} */
            const entireWordCheckbox = (/** @type {?} */ (document.getElementById('findEntireWord')));
            if (entireWordCheckbox) {
                entireWordCheckbox.checked = options.wholeWords || false;
            }
            /** @type {?} */
            const findIgnoreAccentsCheckbox = (/** @type {?} */ (document.getElementById('findIgnoreAccents')));
            if (findIgnoreAccentsCheckbox) {
                findIgnoreAccentsCheckbox.checked = options.ignoreAccents || false;
            }
            /** @type {?} */
            const multipleSearchTerms = options.findMultipleSearchTexts || text.includes('\n') || false;
            /** @type {?} */
            const findMultipleSearchTextsCheckbox = (/** @type {?} */ (document.getElementById('findMultipleSearchTexts')));
            if (findMultipleSearchTextsCheckbox) {
                findMultipleSearchTextsCheckbox.checked = multipleSearchTerms;
            }
            /** @type {?} */
            const individualWordsModeCheckbox = (/** @type {?} */ (document.getElementById('individualWordsMode')));
            if (individualWordsModeCheckbox) {
                individualWordsModeCheckbox.checked = false;
            }
            /** @type {?} */
            const fuzzySearchCheckbox = (/** @type {?} */ (document.getElementById('findFuzzy')));
            if (fuzzySearchCheckbox) {
                fuzzySearchCheckbox.checked = options.fuzzySearch || false;
            }
            /** @type {?} */
            const inputField = multipleSearchTerms ? document.getElementById('findInputMultiline') : document.getElementById('findInput');
            if (inputField) {
                if (inputField instanceof HTMLTextAreaElement) {
                    inputField.value = text;
                    // todo dirty hack!
                    inputField.classList.remove('hidden');
                    ((/** @type {?} */ (document.getElementById('findInput')))).classList.add('hidden');
                    ((/** @type {?} */ (document.getElementById('individualWordsModeLabel')))).classList.remove('hidden');
                    ((/** @type {?} */ (document.getElementById('individualWordsMode')))).classList.remove('hidden');
                    // end of the dirty hack
                }
                else if (inputField instanceof HTMLInputElement) {
                    inputField.value = text;
                    // todo dirty hack!
                    inputField.classList.remove('hidden');
                    ((/** @type {?} */ (document.getElementById('findInputMultiline')))).classList.add('hidden');
                    ((/** @type {?} */ (document.getElementById('individualWordsModeLabel')))).classList.add('hidden');
                    ((/** @type {?} */ (document.getElementById('individualWordsMode')))).classList.add('hidden');
                    // end of the dirty hack
                }
                inputField.dispatchEvent(new Event('input'));
                return true;
            }
            else {
                // tslint:disable-next-line:quotemark
                console.error("Unexpected error: the input field used to search isn't part of the DOM.");
                return false;
            }
        }
    }
    /**
     * @return {?}
     */
    findNext() {
        if (!NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized) {
            // tslint:disable-next-line:quotemark
            console.error("The PDF viewer hasn't finished initializing. Please call findNext() later.");
            return false;
        }
        else {
            /** @type {?} */
            const button = document.getElementById('findNext');
            if (button) {
                button.click();
                return true;
            }
            return false;
        }
    }
    /**
     * @return {?}
     */
    findPrevious() {
        if (!NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized) {
            // tslint:disable-next-line:quotemark
            console.error("The PDF viewer hasn't finished initializing. Please call findPrevious() later.");
            return false;
        }
        else {
            /** @type {?} */
            const button = document.getElementById('findPrevious');
            if (button) {
                button.click();
                return true;
            }
            return false;
        }
    }
    /**
     * @param {?=} printRange
     * @return {?}
     */
    print(printRange) {
        /** @type {?} */
        const PDFViewerApplication = ((/** @type {?} */ (window))).PDFViewerApplication;
        /** @type {?} */
        const alreadyThere = !!window['isInPDFPrintRange'] && !printRange;
        if (!alreadyThere) {
            if (!printRange) {
                printRange = (/** @type {?} */ ({}));
            }
            this.setPrintRange(printRange);
        }
        ((/** @type {?} */ (window))).printPDF();
        if (!alreadyThere) {
            PDFViewerApplication.eventBus.on('afterprint', (/**
             * @return {?}
             */
            () => {
                this.removePrintRange();
            }));
        }
    }
    /**
     * @return {?}
     */
    removePrintRange() {
        window['isInPDFPrintRange'] = undefined;
        window['filteredPageCount'] = undefined;
    }
    /**
     * @param {?} printRange
     * @return {?}
     */
    setPrintRange(printRange) {
        /** @type {?} */
        const PDFViewerApplication = ((/** @type {?} */ (window))).PDFViewerApplication;
        window['isInPDFPrintRange'] = (/**
         * @param {?} page
         * @return {?}
         */
        (page) => this.isInPDFPrintRange(page, (/** @type {?} */ (printRange))));
        window['filteredPageCount'] = this.filteredPageCount(PDFViewerApplication.pagesCount, printRange);
    }
    /**
     * @param {?} pageCount
     * @param {?} range
     * @return {?}
     */
    filteredPageCount(pageCount, range) {
        /** @type {?} */
        let result = 0;
        for (let page = 1; page <= pageCount; page++) {
            if (this.isInPDFPrintRange(page, range)) {
                result++;
            }
        }
        return result;
    }
    /**
     * @param {?} pageIndex
     * @param {?} printRange
     * @return {?}
     */
    isInPDFPrintRange(pageIndex, printRange) {
        /** @type {?} */
        const page = pageIndex + 1;
        if (printRange.from) {
            if (page < printRange.from) {
                return false;
            }
        }
        if (printRange.to) {
            if (page > printRange.to) {
                return false;
            }
        }
        if (printRange.excluded) {
            /** @type {?} */
            let e = (/** @type {?} */ (printRange.excluded));
            if (e.some((/**
             * @param {?} p
             * @return {?}
             */
            (p) => p === page))) {
                return false;
            }
        }
        if (printRange.included) {
            if (!printRange.included.some((/**
             * @param {?} p
             * @return {?}
             */
            (p) => p === page))) {
                return false;
            }
        }
        return true;
    }
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    getPageAsText(pageNumber) {
        /** @type {?} */
        const PDFViewerApplication = ((/** @type {?} */ (window))).PDFViewerApplication;
        /** @type {?} */
        const pdfDocument = PDFViewerApplication.pdfDocument;
        /** @type {?} */
        const pagePromise = pdfDocument.getPage(pageNumber);
        /** @type {?} */
        const extractTextSnippets = (/**
         * @param {?} pdfPage
         * @return {?}
         */
        (pdfPage) => new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            const textSnippets = pdfPage.getTextContent();
            resolve(textSnippets);
        })));
        /** @type {?} */
        const combineTextSnippets = (/**
         * @param {?} textSnippets
         * @return {?}
         */
        (textSnippets) => new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            const text = this.convertTextInfoToText(textSnippets);
            resolve(text);
        })));
        return pagePromise.then(extractTextSnippets).then(combineTextSnippets);
    }
    /**
     * @private
     * @param {?} textInfo
     * @return {?}
     */
    convertTextInfoToText(textInfo) {
        if (!textInfo) {
            return '';
        }
        return textInfo.items.map((/**
         * @param {?} info
         * @return {?}
         */
        (info) => info.str)).join('');
    }
    /**
     * @param {?} pageNumber
     * @param {?} scale
     * @return {?}
     */
    getPageAsImage(pageNumber, scale) {
        /** @type {?} */
        const PDFViewerApplication = ((/** @type {?} */ (window))).PDFViewerApplication;
        /** @type {?} */
        const pdfDocument = PDFViewerApplication.pdfDocument;
        /** @type {?} */
        const pagePromise = pdfDocument.getPage(pageNumber);
        /** @type {?} */
        const imagePromise = (/**
         * @param {?} pdfPage
         * @return {?}
         */
        (pdfPage) => new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            resolve(this.draw(pdfPage, scale));
        })));
        return pagePromise.then(imagePromise);
    }
    /**
     * @private
     * @param {?} pdfPage
     * @param {?} scale
     * @return {?}
     */
    draw(pdfPage, scale) {
        /** @type {?} */
        let zoomFactor = 1;
        if (scale.scale) {
            zoomFactor = scale.scale;
        }
        else if (scale.width) {
            zoomFactor = scale.width / pdfPage.getViewport({ scale: 1 }).width;
        }
        else if (scale.height) {
            zoomFactor = scale.height / pdfPage.getViewport({ scale: 1 }).height;
        }
        /** @type {?} */
        const viewport = pdfPage.getViewport({
            scale: zoomFactor,
        });
        const { ctx, canvas } = this.getPageDrawContext(viewport.width, viewport.height);
        /** @type {?} */
        const drawViewport = viewport.clone();
        /** @type {?} */
        const renderContext = {
            canvasContext: ctx,
            viewport: drawViewport,
        };
        /** @type {?} */
        const renderTask = pdfPage.render(renderContext);
        /** @type {?} */
        const dataUrlPromise = (/**
         * @return {?}
         */
        () => new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            resolve(canvas.toDataURL());
        })));
        return renderTask.promise.then(dataUrlPromise);
    }
    /**
     * @private
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    getPageDrawContext(width, height) {
        /** @type {?} */
        const canvas = (/** @type {?} */ (document.createElement('canvas')));
        /** @type {?} */
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) {
            // tslint:disable-next-line: quotemark
            throw new Error("Couldn't create the 2d context");
        }
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        return { ctx, canvas };
    }
    /**
     * @return {?}
     */
    getCurrentDocumentAsBlob() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const PDFViewerApplication = ((/** @type {?} */ (window))).PDFViewerApplication;
            /** @type {?} */
            const data = yield PDFViewerApplication.pdfDocument.saveDocument(PDFViewerApplication.pdfDocument.annotationStorage);
            return new Blob([data], { type: 'application/pdf' });
        });
    }
    /**
     * @return {?}
     */
    getFormData() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const PDFViewerApplication = ((/** @type {?} */ (window))).PDFViewerApplication;
            /** @type {?} */
            const pdf /*: PDFDocumentProxy */ = PDFViewerApplication.pdfDocument;
            // screen DPI / PDF DPI
            /** @type {?} */
            const dpiRatio = 96 / 72;
            /** @type {?} */
            const result = [];
            for (let i = 1; i <= pdf.numPages; i++) {
                // track the current page
                /** @type {?} */
                const currentPage /* : PDFPageProxy */ = yield pdf.getPage(i);
                /** @type {?} */
                const annotations = yield currentPage.getAnnotations();
                annotations
                    .filter((/**
                 * @param {?} a
                 * @return {?}
                 */
                (a) => a.subtype === 'Widget')) // get the form field annotations only
                    .forEach((/**
                 * @param {?} a
                 * @return {?}
                 */
                (a) => {
                    // get the rectangle that represent the single field
                    // and resize it according to the current DPI
                    /** @type {?} */
                    const fieldRect = currentPage.getViewport({ scale: dpiRatio }).convertToViewportRectangle(a.rect);
                    // add the corresponding input
                    result.push({ fieldAnnotation: a, fieldRect });
                }));
            }
            return result;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWV4dGVuZGVkLXBkZi12aWV3ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1leHRlbmRlZC1wZGYtdmlld2VyLyIsInNvdXJjZXMiOlsibGliL25neC1leHRlbmRlZC1wZGYtdmlld2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7O0FBSXBGLGlDQU9DOzs7SUFOQyxtQ0FBdUI7O0lBQ3ZCLGdDQUFvQjs7SUFDcEIsaUNBQXFCOztJQUNyQixvQ0FBd0I7O0lBQ3hCLDhDQUFrQzs7SUFDbEMsa0NBQXNCOzs7OztBQUd4QiwwQkFHQzs7O0lBRkMsMEJBQThCOztJQUM5Qiw2QkFBMEI7Ozs7O0FBRzVCLDBDQUlDOzs7SUFIQyxxQ0FBZTs7SUFDZixzQ0FBZ0I7O0lBQ2hCLHFDQUFlOztBQUdqQixNQUFNLE9BQU8sMkJBQTJCO0lBQ3RDLGdCQUFlLENBQUM7Ozs7OztJQUVULFlBQVksQ0FBQyxJQUFtQixFQUFFLFVBQXVCLEVBQUU7UUFDaEUsT0FBTyxxQkFDRixPQUFPLElBQ1YsdUJBQXVCLEVBQUUsSUFBSSxHQUM5QixDQUFDOztjQUNJLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUk7UUFDM0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7Ozs7SUFFTSxJQUFJLENBQUMsSUFBWSxFQUFFLFVBQXVCLEVBQUU7UUFDakQsSUFBSSxDQUFDLDZCQUE2QixDQUFDLCtCQUErQixFQUFFO1lBQ2xFLHFDQUFxQztZQUNyQyxPQUFPLENBQUMsS0FBSyxDQUFDLHdFQUF3RSxDQUFDLENBQUM7WUFDeEYsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNOztrQkFDQyxvQkFBb0IsR0FBRyxtQkFBQSxRQUFRLENBQUMsY0FBYyxDQUFD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RSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFDLENBQUMsc0NBQXNDO3FCQUM1RSxPQUFPOzs7O2dCQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Ozs7MEJBR1AsU0FBUyxHQUFrQixXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFFaEgsOEJBQThCO29CQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLEVBQUMsQ0FBQzthQUNOO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBQREZEb2N1bWVudFByb3h5LCBQREZQYWdlUHJveHkgfSBmcm9tICcuLy4uLy4uL3R5cGVzL3NyYy9kaXNwbGF5L2FwaS5kJztcbmltcG9ydCB7IE5neEV4dGVuZGVkUGRmVmlld2VyQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtZXh0ZW5kZWQtcGRmLXZpZXdlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUERGUHJpbnRSYW5nZSB9IGZyb20gJy4vb3B0aW9ucy9wZGYtcHJpbnQtcmFuZ2UnO1xuaW1wb3J0IHsgSVBERlZpZXdlckFwcGxpY2F0aW9uIH0gZnJvbSAnLi9vcHRpb25zL3BkZi12aWV3ZXItYXBwbGljYXRpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbmRPcHRpb25zIHtcbiAgaGlnaGxpZ2h0QWxsPzogYm9vbGVhbjtcbiAgbWF0Y2hDYXNlPzogYm9vbGVhbjtcbiAgd2hvbGVXb3Jkcz86IGJvb2xlYW47XG4gIGlnbm9yZUFjY2VudHM/OiBib29sZWFuO1xuICBmaW5kTXVsdGlwbGVTZWFyY2hUZXh0cz86IGJvb2xlYW47XG4gIGZ1enp5U2VhcmNoPzogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIERyYXdDb250ZXh0IHtcbiAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUERGRXhwb3J0U2NhbGVGYWN0b3Ige1xuICB3aWR0aD86IG51bWJlcjtcbiAgaGVpZ2h0PzogbnVtYmVyO1xuICBzY2FsZT86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIE5neEV4dGVuZGVkUGRmVmlld2VyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBwdWJsaWMgZmluZE11bHRpcGxlKHRleHQ6IEFycmF5PHN0cmluZz4sIG9wdGlvbnM6IEZpbmRPcHRpb25zID0ge30pOiBib29sZWFuIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIGZpbmRNdWx0aXBsZVNlYXJjaFRleHRzOiB0cnVlLFxuICAgIH07XG4gICAgY29uc3Qgc2VhcmNoU3RyaW5nID0gdGV4dC5qb2luKCdcXG4nKSArICdcXG4nO1xuICAgIHJldHVybiB0aGlzLmZpbmQoc2VhcmNoU3RyaW5nLCBvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBmaW5kKHRleHQ6IHN0cmluZywgb3B0aW9uczogRmluZE9wdGlvbnMgPSB7fSk6IGJvb2xlYW4ge1xuICAgIGlmICghTmd4RXh0ZW5kZWRQZGZWaWV3ZXJDb21wb25lbnQubmd4RXh0ZW5kZWRQZGZWaWV3ZXJJbml0aWFsaXplZCkge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnF1b3RlbWFya1xuICAgICAgY29uc29sZS5lcnJvcihcIlRoZSBQREYgdmlld2VyIGhhc24ndCBmaW5pc2hlZCBpbml0aWFsaXppbmcuIFBsZWFzZSBjYWxsIGZpbmQoKSBsYXRlci5cIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhpZ2hsaWdodEFsbENoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbmRIaWdobGlnaHRBbGwnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgaWYgKGhpZ2hsaWdodEFsbENoZWNrYm94KSB7XG4gICAgICAgIGhpZ2hsaWdodEFsbENoZWNrYm94LmNoZWNrZWQgPSBvcHRpb25zLmhpZ2hsaWdodEFsbCB8fCBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG1hdGNoQ2FzZUNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbmRNYXRjaENhc2UnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgaWYgKG1hdGNoQ2FzZUNoZWNrYm94KSB7XG4gICAgICAgIG1hdGNoQ2FzZUNoZWNrYm94LmNoZWNrZWQgPSBvcHRpb25zLm1hdGNoQ2FzZSB8fCBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGVudGlyZVdvcmRDaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5kRW50aXJlV29yZCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICBpZiAoZW50aXJlV29yZENoZWNrYm94KSB7XG4gICAgICAgIGVudGlyZVdvcmRDaGVja2JveC5jaGVja2VkID0gb3B0aW9ucy53aG9sZVdvcmRzIHx8IGZhbHNlO1xuICAgICAgfVxuICAgICAgY29uc3QgZmluZElnbm9yZUFjY2VudHNDaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5kSWdub3JlQWNjZW50cycpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICBpZiAoZmluZElnbm9yZUFjY2VudHNDaGVja2JveCkge1xuICAgICAgICBmaW5kSWdub3JlQWNjZW50c0NoZWNrYm94LmNoZWNrZWQgPSBvcHRpb25zLmlnbm9yZUFjY2VudHMgfHwgZmFsc2U7XG4gICAgICB9XG4gICAgICBjb25zdCBtdWx0aXBsZVNlYXJjaFRlcm1zID0gb3B0aW9ucy5maW5kTXVsdGlwbGVTZWFyY2hUZXh0cyB8fCB0ZXh0LmluY2x1ZGVzKCdcXG4nKSB8fCBmYWxzZTtcbiAgICAgIGNvbnN0IGZpbmRNdWx0aXBsZVNlYXJjaFRleHRzQ2hlY2tib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluZE11bHRpcGxlU2VhcmNoVGV4dHMnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgaWYgKGZpbmRNdWx0aXBsZVNlYXJjaFRleHRzQ2hlY2tib3gpIHtcbiAgICAgICAgZmluZE11bHRpcGxlU2VhcmNoVGV4dHNDaGVja2JveC5jaGVja2VkID0gbXVsdGlwbGVTZWFyY2hUZXJtcztcbiAgICAgIH1cbiAgICAgIGNvbnN0IGluZGl2aWR1YWxXb3Jkc01vZGVDaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmRpdmlkdWFsV29yZHNNb2RlJykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIGlmIChpbmRpdmlkdWFsV29yZHNNb2RlQ2hlY2tib3gpIHtcbiAgICAgICAgaW5kaXZpZHVhbFdvcmRzTW9kZUNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZ1enp5U2VhcmNoQ2hlY2tib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluZEZ1enp5JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIGlmIChmdXp6eVNlYXJjaENoZWNrYm94KSB7XG4gICAgICAgIGZ1enp5U2VhcmNoQ2hlY2tib3guY2hlY2tlZCA9IG9wdGlvbnMuZnV6enlTZWFyY2ggfHwgZmFsc2U7XG4gICAgICB9XG4gICAgICBjb25zdCBpbnB1dEZpZWxkID0gbXVsdGlwbGVTZWFyY2hUZXJtcyA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5kSW5wdXRNdWx0aWxpbmUnKSA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5kSW5wdXQnKTtcbiAgICAgIGlmIChpbnB1dEZpZWxkKSB7XG4gICAgICAgIGlmIChpbnB1dEZpZWxkIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkge1xuICAgICAgICAgIGlucHV0RmllbGQudmFsdWUgPSB0ZXh0O1xuXG4gICAgICAgICAgLy8gdG9kbyBkaXJ0eSBoYWNrIVxuICAgICAgICAgIGlucHV0RmllbGQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5kSW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZGl2aWR1YWxXb3Jkc01vZGVMYWJlbCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5kaXZpZHVhbFdvcmRzTW9kZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgIC8vIGVuZCBvZiB0aGUgZGlydHkgaGFja1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0RmllbGQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgaW5wdXRGaWVsZC52YWx1ZSA9IHRleHQ7XG4gICAgICAgICAgLy8gdG9kbyBkaXJ0eSBoYWNrIVxuICAgICAgICAgIGlucHV0RmllbGQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5kSW5wdXRNdWx0aWxpbmUnKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZGl2aWR1YWxXb3Jkc01vZGVMYWJlbCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5kaXZpZHVhbFdvcmRzTW9kZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgIC8vIGVuZCBvZiB0aGUgZGlydHkgaGFja1xuICAgICAgICB9XG4gICAgICAgIGlucHV0RmllbGQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JykpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpxdW90ZW1hcmtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlVuZXhwZWN0ZWQgZXJyb3I6IHRoZSBpbnB1dCBmaWVsZCB1c2VkIHRvIHNlYXJjaCBpc24ndCBwYXJ0IG9mIHRoZSBET00uXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGZpbmROZXh0KCk6IGJvb2xlYW4ge1xuICAgIGlmICghTmd4RXh0ZW5kZWRQZGZWaWV3ZXJDb21wb25lbnQubmd4RXh0ZW5kZWRQZGZWaWV3ZXJJbml0aWFsaXplZCkge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnF1b3RlbWFya1xuICAgICAgY29uc29sZS5lcnJvcihcIlRoZSBQREYgdmlld2VyIGhhc24ndCBmaW5pc2hlZCBpbml0aWFsaXppbmcuIFBsZWFzZSBjYWxsIGZpbmROZXh0KCkgbGF0ZXIuXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluZE5leHQnKTtcbiAgICAgIGlmIChidXR0b24pIHtcbiAgICAgICAgYnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBmaW5kUHJldmlvdXMoKTogYm9vbGVhbiB7XG4gICAgaWYgKCFOZ3hFeHRlbmRlZFBkZlZpZXdlckNvbXBvbmVudC5uZ3hFeHRlbmRlZFBkZlZpZXdlckluaXRpYWxpemVkKSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cXVvdGVtYXJrXG4gICAgICBjb25zb2xlLmVycm9yKFwiVGhlIFBERiB2aWV3ZXIgaGFzbid0IGZpbmlzaGVkIGluaXRpYWxpemluZy4gUGxlYXNlIGNhbGwgZmluZFByZXZpb3VzKCkgbGF0ZXIuXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluZFByZXZpb3VzJyk7XG4gICAgICBpZiAoYnV0dG9uKSB7XG4gICAgICAgIGJ1dHRvbi5jbGljaygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcHJpbnQocHJpbnRSYW5nZT86IFBERlByaW50UmFuZ2UpIHtcbiAgICBjb25zdCBQREZWaWV3ZXJBcHBsaWNhdGlvbjogSVBERlZpZXdlckFwcGxpY2F0aW9uID0gKHdpbmRvdyBhcyBhbnkpLlBERlZpZXdlckFwcGxpY2F0aW9uO1xuICAgIGNvbnN0IGFscmVhZHlUaGVyZSA9ICEhd2luZG93Wydpc0luUERGUHJpbnRSYW5nZSddICYmICFwcmludFJhbmdlO1xuICAgIGlmICghYWxyZWFkeVRoZXJlKSB7XG4gICAgICBpZiAoIXByaW50UmFuZ2UpIHtcbiAgICAgICAgcHJpbnRSYW5nZSA9IHt9IGFzIFBERlByaW50UmFuZ2U7XG4gICAgICB9XG4gICAgICB0aGlzLnNldFByaW50UmFuZ2UocHJpbnRSYW5nZSk7XG4gICAgfVxuICAgICh3aW5kb3cgYXMgYW55KS5wcmludFBERigpO1xuICAgIGlmICghYWxyZWFkeVRoZXJlKSB7XG4gICAgICBQREZWaWV3ZXJBcHBsaWNhdGlvbi5ldmVudEJ1cy5vbignYWZ0ZXJwcmludCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmVQcmludFJhbmdlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlUHJpbnRSYW5nZSgpIHtcbiAgICB3aW5kb3dbJ2lzSW5QREZQcmludFJhbmdlJ10gPSB1bmRlZmluZWQ7XG4gICAgd2luZG93WydmaWx0ZXJlZFBhZ2VDb3VudCddID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIHNldFByaW50UmFuZ2UocHJpbnRSYW5nZTogUERGUHJpbnRSYW5nZSkge1xuICAgIGNvbnN0IFBERlZpZXdlckFwcGxpY2F0aW9uOiBJUERGVmlld2VyQXBwbGljYXRpb24gPSAod2luZG93IGFzIGFueSkuUERGVmlld2VyQXBwbGljYXRpb247XG4gICAgd2luZG93Wydpc0luUERGUHJpbnRSYW5nZSddID0gKHBhZ2U6IG51bWJlcikgPT4gdGhpcy5pc0luUERGUHJpbnRSYW5nZShwYWdlLCBwcmludFJhbmdlIGFzIFBERlByaW50UmFuZ2UpO1xuICAgIHdpbmRvd1snZmlsdGVyZWRQYWdlQ291bnQnXSA9IHRoaXMuZmlsdGVyZWRQYWdlQ291bnQoUERGVmlld2VyQXBwbGljYXRpb24ucGFnZXNDb3VudCwgcHJpbnRSYW5nZSk7XG4gIH1cblxuICBwdWJsaWMgZmlsdGVyZWRQYWdlQ291bnQocGFnZUNvdW50OiBudW1iZXIsIHJhbmdlOiBQREZQcmludFJhbmdlKTogbnVtYmVyIHtcbiAgICBsZXQgcmVzdWx0ID0gMDtcbiAgICBmb3IgKGxldCBwYWdlID0gMTsgcGFnZSA8PSBwYWdlQ291bnQ7IHBhZ2UrKykge1xuICAgICAgaWYgKHRoaXMuaXNJblBERlByaW50UmFuZ2UocGFnZSwgcmFuZ2UpKSB7XG4gICAgICAgIHJlc3VsdCsrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGlzSW5QREZQcmludFJhbmdlKHBhZ2VJbmRleDogbnVtYmVyLCBwcmludFJhbmdlOiBQREZQcmludFJhbmdlKSB7XG4gICAgY29uc3QgcGFnZSA9IHBhZ2VJbmRleCArIDE7XG4gICAgaWYgKHByaW50UmFuZ2UuZnJvbSkge1xuICAgICAgaWYgKHBhZ2UgPCBwcmludFJhbmdlLmZyb20pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJpbnRSYW5nZS50bykge1xuICAgICAgaWYgKHBhZ2UgPiBwcmludFJhbmdlLnRvKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHByaW50UmFuZ2UuZXhjbHVkZWQpIHtcbiAgICAgIGxldCBlID0gcHJpbnRSYW5nZS5leGNsdWRlZCBhcyBBcnJheTxudW1iZXI+O1xuICAgICAgaWYgKGUuc29tZSgocCkgPT4gcCA9PT0gcGFnZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJpbnRSYW5nZS5pbmNsdWRlZCkge1xuICAgICAgaWYgKCFwcmludFJhbmdlLmluY2x1ZGVkLnNvbWUoKHApID0+IHAgPT09IHBhZ2UpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0UGFnZUFzVGV4dChwYWdlTnVtYmVyOiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IFBERlZpZXdlckFwcGxpY2F0aW9uOiBJUERGVmlld2VyQXBwbGljYXRpb24gPSAod2luZG93IGFzIGFueSkuUERGVmlld2VyQXBwbGljYXRpb247XG4gICAgY29uc3QgcGRmRG9jdW1lbnQgPSBQREZWaWV3ZXJBcHBsaWNhdGlvbi5wZGZEb2N1bWVudDtcblxuICAgIGNvbnN0IHBhZ2VQcm9taXNlOiBQcm9taXNlPGFueT4gPSBwZGZEb2N1bWVudC5nZXRQYWdlKHBhZ2VOdW1iZXIpO1xuXG4gICAgY29uc3QgZXh0cmFjdFRleHRTbmlwcGV0cyA9IChwZGZQYWdlKSA9PlxuICAgICAgbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHRTbmlwcGV0cyA9IHBkZlBhZ2UuZ2V0VGV4dENvbnRlbnQoKTtcbiAgICAgICAgcmVzb2x2ZSh0ZXh0U25pcHBldHMpO1xuICAgICAgfSk7XG4gICAgY29uc3QgY29tYmluZVRleHRTbmlwcGV0cyA9ICh0ZXh0U25pcHBldHMpID0+XG4gICAgICBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMuY29udmVydFRleHRJbmZvVG9UZXh0KHRleHRTbmlwcGV0cyk7XG4gICAgICAgIHJlc29sdmUodGV4dCk7XG4gICAgICB9KTtcbiAgICByZXR1cm4gcGFnZVByb21pc2UudGhlbihleHRyYWN0VGV4dFNuaXBwZXRzKS50aGVuKGNvbWJpbmVUZXh0U25pcHBldHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0VGV4dEluZm9Ub1RleHQodGV4dEluZm86IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKCF0ZXh0SW5mbykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dEluZm8uaXRlbXMubWFwKChpbmZvKSA9PiBpbmZvLnN0cikuam9pbignJyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UGFnZUFzSW1hZ2UocGFnZU51bWJlcjogbnVtYmVyLCBzY2FsZTogUERGRXhwb3J0U2NhbGVGYWN0b3IpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IFBERlZpZXdlckFwcGxpY2F0aW9uOiBJUERGVmlld2VyQXBwbGljYXRpb24gPSAod2luZG93IGFzIGFueSkuUERGVmlld2VyQXBwbGljYXRpb247XG4gICAgY29uc3QgcGRmRG9jdW1lbnQgPSBQREZWaWV3ZXJBcHBsaWNhdGlvbi5wZGZEb2N1bWVudDtcbiAgICBjb25zdCBwYWdlUHJvbWlzZTogUHJvbWlzZTxhbnk+ID0gcGRmRG9jdW1lbnQuZ2V0UGFnZShwYWdlTnVtYmVyKTtcbiAgICBjb25zdCBpbWFnZVByb21pc2UgPSAocGRmUGFnZSkgPT5cbiAgICAgIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuZHJhdyhwZGZQYWdlLCBzY2FsZSkpO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gcGFnZVByb21pc2UudGhlbihpbWFnZVByb21pc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3KHBkZlBhZ2U6IGFueSwgc2NhbGU6IFBERkV4cG9ydFNjYWxlRmFjdG9yKTogUHJvbWlzZTxIVE1MQ2FudmFzRWxlbWVudD4ge1xuICAgIGxldCB6b29tRmFjdG9yID0gMTtcbiAgICBpZiAoc2NhbGUuc2NhbGUpIHtcbiAgICAgIHpvb21GYWN0b3IgPSBzY2FsZS5zY2FsZTtcbiAgICB9IGVsc2UgaWYgKHNjYWxlLndpZHRoKSB7XG4gICAgICB6b29tRmFjdG9yID0gc2NhbGUud2lkdGggLyBwZGZQYWdlLmdldFZpZXdwb3J0KHsgc2NhbGU6IDEgfSkud2lkdGg7XG4gICAgfSBlbHNlIGlmIChzY2FsZS5oZWlnaHQpIHtcbiAgICAgIHpvb21GYWN0b3IgPSBzY2FsZS5oZWlnaHQgLyBwZGZQYWdlLmdldFZpZXdwb3J0KHsgc2NhbGU6IDEgfSkuaGVpZ2h0O1xuICAgIH1cbiAgICBjb25zdCB2aWV3cG9ydCA9IHBkZlBhZ2UuZ2V0Vmlld3BvcnQoe1xuICAgICAgc2NhbGU6IHpvb21GYWN0b3IsXG4gICAgfSk7XG4gICAgY29uc3QgeyBjdHgsIGNhbnZhcyB9ID0gdGhpcy5nZXRQYWdlRHJhd0NvbnRleHQodmlld3BvcnQud2lkdGgsIHZpZXdwb3J0LmhlaWdodCk7XG4gICAgY29uc3QgZHJhd1ZpZXdwb3J0ID0gdmlld3BvcnQuY2xvbmUoKTtcblxuICAgIGNvbnN0IHJlbmRlckNvbnRleHQgPSB7XG4gICAgICBjYW52YXNDb250ZXh0OiBjdHgsXG4gICAgICB2aWV3cG9ydDogZHJhd1ZpZXdwb3J0LFxuICAgIH07XG4gICAgY29uc3QgcmVuZGVyVGFzayA9IHBkZlBhZ2UucmVuZGVyKHJlbmRlckNvbnRleHQpO1xuXG4gICAgY29uc3QgZGF0YVVybFByb21pc2UgPSAoKSA9PlxuICAgICAgbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHJlc29sdmUoY2FudmFzLnRvRGF0YVVSTCgpKTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlbmRlclRhc2sucHJvbWlzZS50aGVuKGRhdGFVcmxQcm9taXNlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGFnZURyYXdDb250ZXh0KHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogRHJhd0NvbnRleHQge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcsIHsgYWxwaGE6IGZhbHNlIH0pO1xuICAgIGlmICghY3R4KSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHF1b3RlbWFya1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgY3JlYXRlIHRoZSAyZCBjb250ZXh0XCIpO1xuICAgIH1cblxuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG4gICAgcmV0dXJuIHsgY3R4LCBjYW52YXMgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRDdXJyZW50RG9jdW1lbnRBc0Jsb2IoKTogUHJvbWlzZTxCbG9iPiB7XG4gICAgY29uc3QgUERGVmlld2VyQXBwbGljYXRpb246IElQREZWaWV3ZXJBcHBsaWNhdGlvbiA9ICh3aW5kb3cgYXMgYW55KS5QREZWaWV3ZXJBcHBsaWNhdGlvbjtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgUERGVmlld2VyQXBwbGljYXRpb24ucGRmRG9jdW1lbnQuc2F2ZURvY3VtZW50KFBERlZpZXdlckFwcGxpY2F0aW9uLnBkZkRvY3VtZW50LmFubm90YXRpb25TdG9yYWdlKTtcbiAgICByZXR1cm4gbmV3IEJsb2IoW2RhdGFdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9wZGYnIH0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldEZvcm1EYXRhKCk6IFByb21pc2U8QXJyYXk8T2JqZWN0Pj4ge1xuICAgIGNvbnN0IFBERlZpZXdlckFwcGxpY2F0aW9uOiBJUERGVmlld2VyQXBwbGljYXRpb24gPSAod2luZG93IGFzIGFueSkuUERGVmlld2VyQXBwbGljYXRpb247XG4gICAgY29uc3QgcGRmIC8qOiBQREZEb2N1bWVudFByb3h5ICovID0gUERGVmlld2VyQXBwbGljYXRpb24ucGRmRG9jdW1lbnQ7XG4gICAgLy8gc2NyZWVuIERQSSAvIFBERiBEUElcbiAgICBjb25zdCBkcGlSYXRpbyA9IDk2IC8gNzI7XG4gICAgY29uc3QgcmVzdWx0OiBBcnJheTxPYmplY3Q+ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gcGRmLm51bVBhZ2VzOyBpKyspIHtcbiAgICAgIC8vIHRyYWNrIHRoZSBjdXJyZW50IHBhZ2VcbiAgICAgIGNvbnN0IGN1cnJlbnRQYWdlIC8qIDogUERGUGFnZVByb3h5ICovID0gYXdhaXQgcGRmLmdldFBhZ2UoaSk7XG4gICAgICBjb25zdCBhbm5vdGF0aW9ucyA9IGF3YWl0IGN1cnJlbnRQYWdlLmdldEFubm90YXRpb25zKCk7XG5cbiAgICAgIGFubm90YXRpb25zXG4gICAgICAgIC5maWx0ZXIoKGEpID0+IGEuc3VidHlwZSA9PT0gJ1dpZGdldCcpIC8vIGdldCB0aGUgZm9ybSBmaWVsZCBhbm5vdGF0aW9ucyBvbmx5XG4gICAgICAgIC5mb3JFYWNoKChhKSA9PiB7XG4gICAgICAgICAgLy8gZ2V0IHRoZSByZWN0YW5nbGUgdGhhdCByZXByZXNlbnQgdGhlIHNpbmdsZSBmaWVsZFxuICAgICAgICAgIC8vIGFuZCByZXNpemUgaXQgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IERQSVxuICAgICAgICAgIGNvbnN0IGZpZWxkUmVjdDogQXJyYXk8bnVtYmVyPiA9IGN1cnJlbnRQYWdlLmdldFZpZXdwb3J0KHsgc2NhbGU6IGRwaVJhdGlvIH0pLmNvbnZlcnRUb1ZpZXdwb3J0UmVjdGFuZ2xlKGEucmVjdCk7XG5cbiAgICAgICAgICAvLyBhZGQgdGhlIGNvcnJlc3BvbmRpbmcgaW5wdXRcbiAgICAgICAgICByZXN1bHQucHVzaCh7IGZpZWxkQW5ub3RhdGlvbjogYSwgZmllbGRSZWN0IH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19