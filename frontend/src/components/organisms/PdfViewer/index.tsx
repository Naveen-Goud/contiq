import React, { useEffect, useRef, useState } from 'react';
import WebViewer from '@pdftron/pdfjs-express';
import theme from '../../../theme';
import { Box, styled } from '@mui/material';
import Pagination from '../../molecules/Pagination';
import SearchDetailsCard from '../SearchDetailsCard';
 
interface PdfViewerProps {
    searchKey: string;
    filePath:any;
    fileName:string
}
export interface DataItem {
    ambientStr: string;
    pageNum: number;
}

const ViewerWrapper = styled(Box)(({ height }: { height: string }) => ({
    height,
    position: 'relative'
}));
const PdfContainer = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
});
const StyledPageCount = styled(Box)(() => ({
    position: 'absolute',
    bottom: '0',
    left: '40vw',
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(4),
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center'
}));
const Overlay = styled(Box)({
    position: 'absolute',
    top: 80,
    right: 60,
    zIndex: 1
});

const PdfViewer = ({ searchKey,fileName,filePath }: PdfViewerProps) => {
    const [_, setForcedRerender] = useState<number>(1);

    const [result, setResult] = useState<DataItem[]>([]);
    const [currentSearchIndex, setCurrentSearchIndex] = useState<number>(0);
    const viewer = useRef<HTMLDivElement>(null);
    const [docViewerState, setDocViewerState] = useState<any>({
        getZoomLevel: () => 0.85,
        getPageCount: () => 5,
        getCurrentPage: () => 5
    });
    const decreaseZoom = () => {
        docViewerState.zoomTo(docViewerState.getZoomLevel() - 0.05);
        setForcedRerender((prev) => prev + 1);
    };
    const increaseZoom = () => {
        docViewerState.zoomTo(docViewerState.getZoomLevel() + 0.05);
        setForcedRerender((prev) => prev + 1);
    };
    const handleNext = () => {
        if (result.length > 0) {
            setCurrentSearchIndex((prevIndex) =>
                prevIndex < result.length - 1 ? prevIndex + 1 : prevIndex
            );
        }
    };
    const handlePrev = () => {
        if (result.length > 0) {
            setCurrentSearchIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        }
    };
    useEffect(() => {
        const webViewerElement = viewer.current;
        const webViewerIframe = document.querySelector(
            "iframe[title='webviewer']"
        ) as HTMLIFrameElement;

        webViewerIframe === null &&
            WebViewer(
                {
                    path: '../../../../public/pdfjsexpress' ,
                    initialDoc:filePath,
                    disabledElements: [
                        'ribbons',
                        'toolsHeader',
                        'header',
                        'leftPanelTabs',
                        'thumbnailsSizeSlider',
                        'leftPanelResizeBar',
                        'contextMenuPopup',
                        'textPopup',
                        'pageNavOverlay',
                        'searchPanel'
                    ]
                },
                webViewerElement
            ).then((instance: any) => {
                const { Core, Annotations, UI } = instance;
                const iframeDoc = UI.iframeWindow.document;
                UI.openElements(['leftPanel']);

                Core.documentViewer.addEventListener(
                    'pageNumberUpdated',
                    (pageNumber: number) => {
                        setForcedRerender((prev) => prev + 1);
                    }
                );

                Core.documentViewer.addEventListener('documentLoaded', () => {
                    setDocViewerState(Core.documentViewer);
                    instance.setPageLabels(
                        Array(Core.documentViewer.getPageCount()).fill('')
                    );

                    const iframeStyle = document.createElement('style');
                    iframeStyle.innerHTML = `
                        :root{
                          --document-background-color:${theme.palette.structural.white};
                          --panel-background:${theme.palette.structural.white};
                          --focus-border:${theme.palette.primary[500]};
                        }
                        ::webkit-scrollbar-track{
                          background-color:${theme.palette.structural.structural}
                        }
                        .Thumbnail .page-label{
                          display:none
                        }
                        .LeftPanel .left-panel-header{
                          margin: 0 !important;
                        }
                        .left-panel-container{
                          width:100%;
                          padding:0 !important;
                         
                        }
                        .Thumbnail .page-image{
                          height:22vh !important;
                          width:10vw !important;
                        }
                        `;
                    iframeDoc.documentElement.appendChild(iframeStyle);
                    const regexPattern = `[A-Z][^.!?]*\\b${searchKey}\\b[^.!?]*\\.`;

                    instance.UI.searchTextFull(searchKey && regexPattern, {
                        regex: true
                    });
                    instance.UI.addSearchListener(
                        (
                            searchPattern: string,
                            options: { regex: true; searchUp: true },
                            result: DataItem[]
                        ) => {
                            setResult(result);
                            setCurrentSearchIndex(0);
                        }
                    );

                    Core.documentViewer.setSearchHighlightColors({
                        searchResult: theme.palette.structural.highlight,
                        activeSearchResult: theme.palette.structural.highlight
                    });
                    Core.documentViewer.setCurrentPage(1);
                });
            });
    }, [result]);

    useEffect(() => {
        if (docViewerState && result.length > 0) {
            const pageIndex = result[currentSearchIndex].pageNum - 1;
            docViewerState.setCurrentPage(pageIndex + 1);
        }
    }, [currentSearchIndex, docViewerState, result]);

    const contentArr = result.map((item) => ({
        ambientStr: item.ambientStr,
        pageNum: item.pageNum
    }));

    return (
        <PdfContainer>
            <ViewerWrapper
                ref={viewer}
                height={'100%'}
                data-testid="IFrame"
            ></ViewerWrapper>
            <Overlay>
                {searchKey && (
                    <SearchDetailsCard
                        searchKey={searchKey}
                        fileName={fileName}
                        totalSlides={docViewerState.getPageCount()}
                        content={contentArr}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                    />
                )}
            </Overlay>
            <StyledPageCount>
                <Pagination
                    currentPage={docViewerState.getCurrentPage()}
                    totalPages={docViewerState.getPageCount()}
                    handleZoomIn={increaseZoom}
                    handleZoomOut={decreaseZoom}
                    zoomRange={Math.round(docViewerState.getZoomLevel() * 100)}
                />
            </StyledPageCount>
        </PdfContainer>
    );
};

export default PdfViewer;
