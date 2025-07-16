// const Airtable = require('airtable');

// ---------------- MICF PAGE ---------------- //
let reportsData;
itemsPerPage = 5;
currentPage = 1;
let latest_nav = null
let latest_date = null
let loader = null

// const creditChartWrap = document.querySelector('#credit-rating-chart-wrapper .flex-block-23');
// const creditList = document.querySelector('#credit-rating-chart-wrapper .credit-list');
// const creditChart = document.querySelector('#credit-quality-chart');

// const holdingChartWrap = document.querySelector('#top-holding-chart-wrapper .flex-block-23');
// const holdingList = document.querySelector('#top-holding-chart-wrapper .holding-list');
// const holdingChart = document.querySelector('#top-holdings-chart');

// const assetChartWrap = document.querySelector('#asset-allocation-chart-wrapper .flex-block-23');
// const assetList = document.querySelector('#asset-allocation-chart-wrapper .assetallocation-list');

// const distributionBodyRow = document.querySelector('.distribution-body');
// const distributionWrap = document.querySelector('.distribution-body .flex-block-23');

// const reportsBodyContainer = document.querySelector('.reports-body');
// const reportWrap = document.querySelector('.reports-body .flex-block-23');

// const poerformanceWrap = document.querySelector('.new-performance-wrap .flex-block-23');

// const offeringDocumentWrapper = document.getElementById('offering-document');

// const PIE_COLORS_NEW = ['#0E70C7', '#3296ED', '#7719E3', '#9D53F2', '#067D77', '#26ABA4', '#EB7F13', '#F7A452', '#E3193B', '#F2536D']
const PIE_COLORS_NEW = ['#0E70C7', '#7719E3', '#067D77', '#EB7F13', '#E3193B', '#3296ED', '#9D53F2', '#26ABA4', '#EB7F13', '#F2536D']


// ---------------- LOADER ---------------- //
function createLoader() { 
    const loaderWrapper = document.createElement('div'); 
    loaderWrapper.id = 'loader-wrapper'; 
    loaderWrapper.className = 'loader-wrapper'; 
    const loaderElement = document.createElement('div'); 
    loaderElement.className = 'loader'; 
    loaderWrapper.appendChild(loaderElement); 
    document.body.appendChild(loaderWrapper);
    return loaderWrapper; 
}
// ---------------------------------------------- //

// YTD & MTD FIELDS
// const ytdMtdField = document.getElementById("ytd-mtd-values");
// const ytdValue = 
// const mtdValue = 
// ytdMtdField.innerText = `${ytdValue} % (MTD)\n${mtdValue} % (YTD)`;


// function tabStopHandler() {Webflow.push(function () {let sectionLinks = document.querySelectorAll('.tab-item');sectionLinks.forEach(function (link) {link.addEventListener('click', function (event) {event.preventDefault();$(document).off('click')})})})}
// function tabHandler() {const tabLinks = document.querySelectorAll(".tab-item"); const header = document.querySelector(".navbar-3"); const headerHeight = header.getBoundingClientRect().height;function handleTabLinkClick(targetSection) {const isTabBarFixed = document.querySelector('.tabs-menu').classList.contains('fixed'); const offset = !isTabBarFixed ? -headerHeight - 170 : -190; const targetSectionRect = targetSection.getBoundingClientRect();window.scrollTo({ top: targetSectionRect.top + window.scrollY + offset, behavior: "smooth" });const sectionId = targetSection.id;if (sectionId) {const updatedUrl = new URL(window.location.href);updatedUrl.searchParams.set("section", sectionId);window.history.replaceState(null, null, updatedUrl);}}tabLinks.forEach(link => {link.addEventListener("click", function (event) {event.preventDefault();const targetSection = document.querySelector(link.getAttribute("href"));handleTabLinkClick(targetSection);const tabsMenu = document.querySelector('.tabs-menu');tabsMenu.classList.add("fixed");});});}
// function scrollHandler() {const tabsMenu = document.querySelector('.tabs-menu');const tabContent = document.querySelector('.tabs-content');const tabWrapper = document.querySelector('#tab-wrapper');const sections = document.querySelectorAll(".tab-content-container");const tabLinks = document.querySelectorAll(".tab-item");let isTabBarFixed;if (tabsMenu) {isTabBarFixed = tabsMenu.classList.contains('fixed');function obCallback(payload) {if (payload[0].isIntersecting && window.scrollY >= 600 && window.innerWidth >= 768) {tabsMenu.classList.add("fixed");tabWrapper.style.paddingTop = '64px';}else {tabsMenu.classList.remove("fixed");tabWrapper.style.paddingTop = '0';}}const ob = new IntersectionObserver(obCallback);ob.observe(tabContent);const options = { threshold: 0.2 };const observer = new IntersectionObserver((entries) => {entries.forEach(entry => {if (entry.isIntersecting) {const offset = !isTabBarFixed ? 250 : 200;const targetId = entry.target.id;const targetTabLinks = document.querySelectorAll(`.tab-item[href="#${targetId}"]`);if (entry.boundingClientRect.top <= offset && entry.intersectionRatio > 0) {tabLinks.forEach(link => link.classList.remove("active"));targetTabLinks.forEach(link => link.classList.add("active"));} else {targetTabLinks.forEach(link => link.classList.remove("active"));}}});}, options);sections.forEach((section) => {observer.observe(section);});} }
// function removePer(str) {if (String(str).includes('%')) return str.replace('%', '');else return str}
// function transformData(data, type) {return data && Object.entries(data).map(([key, value]) => ({ key, value: type === 'table' ? removePer(value) : Number(value?.toString()?.replace("%", "")) })).filter((item) => item.value > 0);}

const createText = (elementId, content) => { const element = document.getElementById(elementId); if (element) { element.textContent = content; } };

const createTextRetirment = (container, elementId, content) => {
    // If container is provided, scope the query to it; otherwise, use document
    const element = container 
        ? container.querySelector(`#${elementId}`)
        : document.getElementById(elementId);
    if (element) {
        element.textContent = content || '-'; // Fallback to '-' if content is undefined/null
    }
};


function renderLoop(data, airPerformances, productName) {
    let { performances, holding, creditRating, distributions, overAllCreditRating, currentAssetAllocation, assetAllocation, creditQuality, weighted_exposure } = data;

    performances = airPerformances

    // console.log('airPerformances')
    // console.log(airPerformances)


    // Performance Values

    if (performances) {
        const performanceContentArea = document.querySelector('#perf-table');
        if (performanceContentArea) {
            const performanceRowsDiv = document.querySelector('#perf-table-rows');
            
            while (performanceRowsDiv.lastChild) {
                if (performanceRowsDiv.lastChild.classList.contains('headers'))
                    break
                else
                    performanceRowsDiv.removeChild(performanceRowsDiv.lastChild);
            }

            performances.forEach((data, index) => {
                // console.log(data)
                const selectedColor = PIE_COLORS_NEW[index];
                const row = document.createElement('div');
                row.classList.add('table-row');

                // <img width="16" src="https://cdn.prod.website-files.com/647f1d0084dd393f468d58a6/66668a5b5b769b78a21062ab_Vectors-Wrapper.svg" alt="" class="image-79">
                const html = `
                <div class="div-block-406 _2">
                    
                    <svg style="margin-right: 6px" xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none"><circle cx="3.5" cy="9.04102" r="3" fill=${selectedColor}></circle></svg>
                </div>
                <div class="table-box _2">
                    <div class="table-data name">
                        <strong class="bold-text">${data?.name || '-'}<br></strong>
                    </div>
                </div>
                <div class="table-box _3">
                    <div class="table-data name">${data.mtd || '-'}</div>
                </div>
                <div class="table-box _3">
                    <div class="table-data name">${data.ytd || '-'}</div>
                </div>
                ${productName === "MICF" ? `
                    <div class="table-box _3">
                        <div class="table-data name">${data.days30 || '-'}</div>
                    </div>` : ''}
                <div class="table-box _3">
                    <div class="table-data name">${data.days90 || '-'}</div>
                </div>
                <div class="table-box _3">
                    <div class="table-data name">${data.days365 || '-'}</div>
                </div>
                <div class="table-box _3">
                    <div class="table-data name">${data.inception || '-'}</div>
                </div>`
                
                row.innerHTML = html;
                performanceRowsDiv.appendChild(row);
            })
        }
    }


    // Portfolio Asset Allocation

    if (assetAllocation) {
        const assetAllocRowsDiv = document.querySelector('#asset-aloc-table-rows');
            
        while (assetAllocRowsDiv.lastChild) {
            if (assetAllocRowsDiv.lastChild.classList.contains('headers'))
                break
            else
                assetAllocRowsDiv.removeChild(assetAllocRowsDiv.lastChild);
        }

        assetAllocation.forEach((data, index) => {
            // console.log(data)

            // Not worth showing 0 values
            if (data['Current month'] === 0 && data['Prev month'] === 0)
                return
            
            const selectedColor = PIE_COLORS_NEW[index];
            const row = document.createElement('div');
            row.classList.add('table-row');

            let curr_month_perc = (data['Current month']) ? (data['Current month'] * 100).toFixed(2) + '%' : '-'
            let prev_month_perc = (data['Current month']) ? (data['Prev month'] * 100).toFixed(2) + '%' : '-'
            
            const html = `
            <div class="div-block-406 _2">
                <svg style="margin-right: 6px" xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none"><circle cx="3.5" cy="9.04102" r="3" fill=${selectedColor}></circle></svg>
            </div>
            <div class="table-box _2">
                <div class="table-data name">
                    <strong class="bold-text">${data.Name || '-'}<br></strong>
                </div>
            </div>
            <div class="table-box _3">
                <div class="table-data name">${curr_month_perc}</div>
            </div>
            <div class="table-box _3">
                <div class="table-data name">${prev_month_perc}</div>
            </div>`

            row.innerHTML = html;
            assetAllocRowsDiv.appendChild(row);
        })
    }


    // Weighted Exposure and Holding List

    let dataMappingsUpdated = null
    
    if (productName === 'MIIETF') {
        dataMappingsUpdated = [
            // { elementClass: '.assetallocation-list', data: currentAssetAllocation },
            { elementClass: '.credit-list', data: creditRating },
            { elementClass: '.holding-list', data: holding }
        ];
    }

    if (productName === 'MICF') {
        dataMappingsUpdated = [
            // { elementClass: '.assetallocation-list', data: currentAssetAllocation },
            // { elementClass: '.credit-list', data: creditRating },
            { elementClass: '.holding-list', data: holding }
        ];
    }

    dataMappingsUpdated.forEach(({ elementClass, data }) => {
        const bodyRow = document.querySelector(elementClass);
        if (Object.keys(data).length > 0) {
            if (elementClass === ".holding-list") {
                const holdingRows = document.querySelector("#holding-table-rows");
                
                if(holdingRows) {
                    while (holdingRows.firstChild) {
                        holdingRows.removeChild(holdingRows.firstChild);
                    }
                    
                    data.forEach((item, index) => {
                        const row = document.createElement('div');
                        row.classList.add('table-row-2');
                        
                        const returnVal = typeof (item.value) == 'string' ? item.value : (item.value).toFixed(2);
                        // const html = `<div class="div-block-410 _2"><img width="16" src="https://cdn.prod.website-files.com/647f1d0084dd393f468d58a6/66668a5b5b769b78a21062ab_Vectors-Wrapper.svg" alt="" class="image-81"></div><div class="table-box _2 sectors"><div class="table-data name sectors"><strong class="bold-text">${item.key}<br></strong></div></div><div class="table-box _3"><div class="table-data name">${returnVal.trim()}%<br></div></div>`
                        const html = `
                        <div class="div-block-410 _2">
                            <svg height="8" width="8" xmlns="http://www.w3.org/2000/svg">
                                <circle r="4" cx="4" cy="4" fill="${PIE_COLORS_NEW[index]}"></circle>
                            </svg>
                        </div>
                        <div class="table-box _2 sectors">
                            <div class="table-data name sectors"><strong class="bold-text">${item.key}<br></strong></div>
                        </div>
                        <div class="table-box _3">
                            <div class="table-data name">${returnVal.trim()}%<br></div>
                        </div>
                        `
                        
                        row.innerHTML = html;
                        holdingRows.appendChild(row);
                    })
                }

                compositionList(data, bodyRow)
            }
            else if(elementClass === ".credit-list") {
                data = weighted_exposure

                const weightedExposureTable = document.querySelector('#weighted_exposure');
                // console.log('weightedExposureTable')
                // console.log(weightedExposureTable)
                
                if (weightedExposureTable) {
                    const weightedExpRowsDiv = document.querySelector('#weighted-exp-table-rows');

                    // console.log('weightedExpRowsDiv')
                    // console.log(weightedExpRowsDiv)
                
                    
                    while (weightedExpRowsDiv.lastChild) {
                        if (weightedExpRowsDiv.lastChild.classList.contains('headers'))
                            break
                        else
                            weightedExpRowsDiv.removeChild(weightedExpRowsDiv.lastChild);
                    }

                    // console.log('data')
                    // console.log(data)
        
                    data.forEach((item, index) => {
                        const row = document.createElement('div');
                        row.classList.add('table-row');
                        
                        // console.log(item)
                        
                        const html = `
                        <div class="table-box _2">
                            <div class="div-block-406 _2" style="margin-right: 8px;">
                                <svg height="8" width="8" xmlns="http://www.w3.org/2000/svg">
                                    <circle r="4" cx="4" cy="4" fill="${PIE_COLORS_NEW[index]}"></circle>
                                </svg>
                            </div>
                            <div class="table-data name"><strong class="bold-text">${item.key}<br></strong></div>
                        </div>
                        <div class="table-box _3">
                            <div class="table-data name">${item.value.miietf}%</div>
                        </div>
                        <div class="table-box _3">
                            <div class="table-data name">${item.value.kmi30}%</div>
                        </div>
                        <div class="table-box _3">
                            <div class="table-data name">${item.value.weight}%</div>
                        </div>
                        `
                        row.innerHTML = html;
                        weightedExpRowsDiv.appendChild(row);
                    })
                }
            }
            else {
                // console.log(elementClass)
                // console.log(data)
                compositionList(data, bodyRow) 
            }
        }
        else { bodyRow.style.display = "none" }
    });

    // if (performances) {
    //     const performanceBodyRow = document.querySelector('.performance-body');
    //     if (performanceBodyRow) {
    //         performances.forEach(data => {
    //             const row = document.createElement('div');
    //             row.classList.add('performance-body-row');
    //             const html = `<div class="performance-body-cell flex-1 right-align"><span class="per-body-title">${data.name || '-'}</span></div><div class="performance-body-cell"><span class="per-body-title">${data.mtd || '-'}</span></div><div class="performance-body-cell"><span class="per-body-title">${data.ytd || '-'}</span></div><div class="performance-body-cell"><span class="per-body-title">${data.days90 || '-'}</span></div><div class="performance-body-cell"><span class="per-body-title">${data.days365 || '-'}</span></div>`; row.innerHTML = html; performanceBodyRow.appendChild(row)
    //         })
    //     }
    // }

    // Credit Quality

    if(creditQuality) {
        // console.log('creditQuality')
        // console.log(creditQuality)

        const creditQualityRows = document.querySelector("#credit-quality-table-rows");

        if (creditQualityRows) {
            while (creditQualityRows.firstChild) {
                creditQualityRows.removeChild(creditQualityRows.firstChild);
            }

            // console.log('creditQuality')
            // console.log(creditQuality)
            
            creditQuality.forEach((item, index) => {
                if (item.value === 0)
                    return
            
                const row = document.createElement('div');
                row.classList.add('table-row-2');
                // console.log(item)

                let perc = `${item.value.toFixed(2)}%`
                // console.log(perc)
                
                const html = `
                <div class="div-block-410 _2">
                    <svg height="8" width="8" xmlns="http://www.w3.org/2000/svg">
                        <circle r="4" cx="4" cy="4" fill="${PIE_COLORS_NEW[index]}"></circle>
                    </svg>
                </div>
                <div class="table-box _2 sectors">
                    <div class="table-data name sectors"><strong class="bold-text">${item.key}<br></strong></div>
                </div>
                <div class="table-box _3">
                    <div class="table-data name">${perc}<br></div>
                </div>
                `
                
                row.innerHTML = html;
                creditQualityRows.appendChild(row);
            })
        }
    }
    
    // Distribution

    if (distributions?.length > 0) {
        const distribution_no_data = document.querySelector('#distribution-no-data');
        const distribution_wrap = document.querySelector('#distribution-wrap');
        
        // console.log('distribution_wrap')
        // console.log(distribution_wrap)
        
        distribution_no_data.style.display = "none";
        
        if (distribution_wrap) {
            distributions.forEach((data) => {
                // console.log(data)
                
                const row = document.createElement('div');
                row.classList.add('table-row');

                const html = `
                <div class="table-box _2">
                    <div class="table-data name"><strong class="bold-text">${data.payoutDate ? data.payoutDate.split(' ')[0] : '-'}<br></strong></div>
                </div>
                <div class="table-box _3">
                    <div class="table-data name">${data.payoutPerUnit.toFixed(3) || '-'}</div>
                </div>
                <div class="table-box _3">
                    <div class="table-data name">${data.exNav.toFixed(4) || '-'}</div>
                </div>
                <div class="table-box _3">
                    <div class="table-data name">${data.yield.toFixed(2) || '-'}%</div>
                </div>
                `
                
                // const html = `<div class="distribution-body-cell flex-1 right-align"><span class="dist-body-title">${data.payoutDate ? data.payoutDate.split(' ')[0] : '-'}</span></div><div class="distribution-body-cell"><span class="dist-body-title">${data.payoutPerUnit.toFixed(3) || '-'}</span></div><div class="distribution-body-cell"><span class="dist-body-title">${data.exNav.toFixed(4) || '-'}</span></div><div class="distribution-body-cell"><span class="dist-body-title">${data.yield.toFixed(2) || '-'}</span></div>`;
                row.innerHTML = html;
                
                distribution_wrap.appendChild(row)
            })
        }
    }

    // if (performances) {
    //     const performanceContentArea = document.querySelector('.performace-new-table');
    //     if (performanceContentArea) {

    //         while (performanceContentArea.firstChild) {
    //             performanceContentArea.removeChild(performanceContentArea.firstChild);
    //         }

    //         performances.forEach(data => {
    //             const row = document.createElement('div');
    //             row.classList.add('table-item');
    //             const selectedColor = data?.name?.toLowerCase().includes('miietf') ? "#2E90FA" : "#62529B";
    //             const html = `<div class="div-block-98" style="background-color: ${selectedColor}"></div><div class="table-content-area"><h3 class="table-title">${data?.name || '-'}</h3><div class="div-block-99"><div class="div-block-100"><div class="text-block-37">MTD</div><div class="text-block-38">${data.mtd || '-'}</div></div><div class="div-block-100"><div class="text-block-37">YTD</div><div class="text-block-38">${data.ytd || '-'}</div></div><div class="div-block-100"><div class="text-block-37">90 DAYS</div><div class="text-block-38">${data.days90 || '-'}</div></div><div class="div-block-100"><div class="text-block-37">1Y</div><div class="text-block-38">${data.days365 || '-'}</div></div></div></div>`; row.innerHTML = html; performanceContentArea.appendChild(row);
    //         })
    //     }
    // }

    // if (currentAssetAllocation) {
    //     const portfolioDataContainer = document.querySelector('.portfolio-data-container');
    //     if (portfolioDataContainer) {
    //         while (portfolioDataContainer.firstChild) {
    //             portfolioDataContainer.removeChild(portfolioDataContainer.firstChild)
    //         }
    //         currentAssetAllocation.forEach((data, index) => {

    //             // console.log(data)
                
    //             const row = document.createElement('div');
    //             row.classList.add('table-item');
    //             const returnVal = typeof (data.value) == 'string' ? data.value : (data.value).toFixed(2);
    //             const selectedColor = PIE_COLORS_NEW[index];

    //             const html = `
    //             <div class="table-content-area">
    //                 <div style="display: flex; gap: 14px">
    //                     <div class="div-block-101" style="display: flex;">
    //                         <svg style="margin-right: 6px" xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none"><circle cx="3.5" cy="9.04102" r="3" fill=${selectedColor}></circle></svg>
    //                     <div>
    //                     <div class="text-block-37">${data.key}</div>
    //                     <div class="text-block-38">${returnVal}%</div>
    //                 </div>
    //             </div>
    //             `; row.innerHTML = html; portfolioDataContainer.appendChild(row)
    //         })
    //     }
    // }

    function compositionList(data, container) {
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            // data.forEach((item, index) => {
            //     // console.log(item)
            //     const row = document.createElement('div');
            //     row.classList.add('table-item');
            //     row.classList.add('no-min-width');
            //     const returnVal = typeof (item.value) == 'string' ? item.value : (item.value).toFixed(2);
            //     const selectedColor = PIE_COLORS_NEW[index];
            //     const html = `<div class="div-block-98" style="background-color: ${selectedColor}"></div><div class="table-content-area"><div class="text-block-37" style="margin-bottom: 2px">${item.key}</div><div class="text-block-39">${returnVal}%</div></div>`; row.innerHTML = html; container.appendChild(row);
            // })
        }
    }
}

async function getAppWriteData(productName) {

    let appw_data = null;
    const retryLimit = 10;  // Retry 10 time
    const timeoutDuration = 7000;  // Timeout duration in ms (7 seconds)
    
    // Function to perform the fetch request with timeout
    const fetchWithTimeout = async (url, timeout) => {
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), timeout)
        );

        try {
            const response = await Promise.race([
                fetch(url),
                timeoutPromise
            ]);
            return response;
        } catch (error) {
            if (error.message === 'Request timed out') {
                throw new Error('Request timed out');
            } else {
                throw error;
            }
        }
    };


    // Retry logic - We will retry once if necessary
    for (let attempt = 0; attempt < retryLimit; attempt++) {
        try {
            // Make the fetch request depending on product name
            if (productName === 'MIIETF') {
                // appw_data = await fetchWithTimeout('https://66b9babb09e006f25472.appwrite.global/miietf', timeoutDuration);
                appw_data = await fetchWithTimeout('https://dev-mahaana-wealth-marketfeedinvestuniverse.azurewebsites.net/api/fund-data?name=miietf', timeoutDuration);
                // appw_data = await fetchWithTimeout('http://localhost:7071/api/fund-data?name=miietf', timeoutDuration);
            } 
            else if (productName === 'MICF') {
                // appw_data = await fetchWithTimeout('https://66b9babb09e006f25472.appwrite.global/micf', timeoutDuration);
                appw_data = await fetchWithTimeout('https://dev-mahaana-wealth-marketfeedinvestuniverse.azurewebsites.net/api/fund-data?name=micf', timeoutDuration);
                // appw_data = await fetchWithTimeout('http://localhost:7071/api/fund-data?name=micf', timeoutDuration);
            }
            else if (productName === 'MIIRF') {
                console.log('Fetching MIIRF data');
                appw_data = await fetchWithTimeout('https://dev-mahaana-wealth-marketfeedinvestuniverse.azurewebsites.net/api/fund-data?name=miirf', timeoutDuration);
                // appw_data = await fetchWithTimeout('http://localhost:7071/api/fund-data?name=miirf', timeoutDuration);
            }

            // Check if the response is successful
            if (appw_data.ok) {
                
                console.log(attempt+1)
                console.log(`Response Status: ${appw_data.status} ${appw_data.statusText}`);
                const appw_json = await appw_data.json();
                console.log(appw_json);
                return appw_json;
            } 
            else {
                // If the response is not successful (status code outside 200-299)
                console.error(`Error fetching data: ${appw_data.status} ${appw_data.statusText}`);
                // Retry the request
                if (attempt < retryLimit) {
                    console.log('Retrying the request...');
                    continue; // Retry the request
                } 
                else {
                    return null;
                }
            }
        } 
        catch (error) {
            // If the request failed (due to timeout or other errors), retry the request
            console.error(`Attempt ${attempt + 1} failed: ${error.message}`);
            if (attempt < retryLimit) {
                console.log('Retrying the request...');
                continue; // Retry the request
            } 
            else {
                return null;
            }
        }
    }
}


function renderPerformance(product_name, performances, container){
    if (performances) {

        const performanceContentArea = container.querySelector('#perf-table');
        if (performanceContentArea) {
            const performanceRowsDiv = container.querySelector('#perf-table-rows');
            
            while (performanceRowsDiv.lastChild) {
                if (performanceRowsDiv.lastChild.classList.contains('headers'))
                    break
                else
                    performanceRowsDiv.removeChild(performanceRowsDiv.lastChild);
            }

            performances.forEach((data, index) => {
                const selectedColor = PIE_COLORS_NEW[index];
                const row = document.createElement('div');
                row.classList.add('table-row');

                const formatValue = (value) => {
                    if (value != null) {
                        return `${(value * 100).toFixed(2)}%`;
                    }
                    return '-';
                };

                const html = `
                    <div class="div-block-406 _2">
                        <svg style="margin-right: 6px" xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none"><circle cx="3.5" cy="9.04102" r="3" fill=${selectedColor}></circle></svg>
                    </div>
                    <div class="table-box _2">
                        <div class="table-data name">
                            <strong class="bold-text">${data?.name || '-'}<br></strong>
                        </div>
                    </div>
                    <div class="table-box _3">
                        <div class="table-data name">${formatValue(data?.mtd)}</div>
                    </div>
                    <div class="table-box _3">
                        <div class="table-data name">${formatValue(data?.ytd)}</div>
                    </div>
                    <div class="table-box _3">
                        <div class="table-data name">${formatValue(data?.["30d"])}</div>
                    </div>
                    <div class="table-box _3">
                        <div class="table-data name">${formatValue(data?.["90d"])}</div>
                    </div>
                    <div class="table-box _3">
                        <div class="table-data name">${formatValue(data?.["1y"])}</div>
                    </div>
                    <div class="table-box _3">
                        <div class="table-data name">${formatValue(data?.["inception"])}</div>
                    </div>`;

                row.innerHTML = html;
                performanceRowsDiv.appendChild(row);
            });
        }
    }
}

function renderHoldings(container, appwHolding, subfundKey) {
    // Scope the query to the specific holdings container
    const holdingRows = container.querySelector(`#holding-table-rows`);
    
    if (holdingRows && appwHolding[subfundKey].length > 0) {
        // Clear existing table rows
        while (holdingRows.firstChild) {
            holdingRows.removeChild(holdingRows.firstChild);
        }
        console.log(`Rendering holdings for ${subfundKey}:`, appwHolding[subfundKey]);
        
        // Check if the subfund has holdings
        if (appwHolding[subfundKey] && appwHolding[subfundKey].length > 0) {
            // Add holdings rows
            appwHolding[subfundKey].forEach((item, index) => {
                const row = document.createElement('div');
                row.classList.add('table-row-2');
                
                const returnVal = typeof item.value === 'string' ? item.value : item.value.toFixed(2);
                const html = `
                    <div class="div-block-410 _2">
                        <svg height="8" width="8" xmlns="http://www.w3.org/2000/svg">
                            <circle r="4" cx="4" cy="4" fill="${PIE_COLORS_NEW[index % PIE_COLORS_NEW.length]}"></circle>
                        </svg>
                    </div>
                    <div class="table-box _2 sectors">
                        <div class="table-data name sectors"><strong class="bold-text">${item.key}<br></strong></div>
                    </div>
                    <div class="table-box _3">
                        <div class="table-data name">${returnVal.trim()}%<br></div>
                    </div>
                `;
                
                row.innerHTML = html;
                holdingRows.appendChild(row);
            });
        }
    } else {
        console.warn(`No holding-table-rows found in container for ${subfundKey}`);
    }
}

async function getFundData(productName, appwData) {
    console.log('getFundData called with productName:', productName);
    if (productName === "MIIRF") {
        return getMIIRFFundData(appwData);
    } else {
        return getNonMIIRFFundData(productName, appwData);
    }
}

async function getMIIRFFundData(appwData) {
    // main fund info
    const launchDate = new Date(appwData.miirf.info['Launch Date']);
    const launchDateFormatted = moment(launchDate).format('MMM DD, YYYY'); // e.g., "May 26, 2025"

    let fundInfo = {
        custodian: appwData.miirf.info['Custodian'],
        fundAuditors: appwData.miirf.info['Fund Auditors'],
        fundCategory: appwData.miirf.info['Fund Type'],
        fundManager: appwData.miirf.info['Fund manager'],
        investmentObjective: appwData.miirf.info['Investment Objective'],
        launchDate: launchDateFormatted,
        netAssets: `PKR ${(appwData.miirf.info['Net Assets (PKR mn)'] / 1_000_000).toFixed(1)}mn`
    };

    let product_summary = appwData.miirf.info['Fund Summary'] || null;

    let overview = {
        assetCategory: product_summary,
        description: null,
        name: appwData.miirf.info['Name']
    };

    const contentMapping = {
        'asset-name': overview?.name,
        'asset-class': fundInfo.fundCategory,
        "fundType": fundInfo.fundCategory,
        'productSummary': overview.assetCategory,
        'fundManager': fundInfo.fundManager,
        'netAssets': fundInfo.netAssets,
        'launchDate': fundInfo.launchDate || '-',
        'fundCategory': fundInfo.fundCategory,
        'investmentObjective': fundInfo.investmentObjective,
        'fundAuditors': fundInfo.fundAuditors,
        'fundStabilityRating': fundInfo.fundManager,
        'custodian': fundInfo.custodian
    };


    const mainFundContainer = document.querySelector('.container-12:not(.miirf)');
    if (mainFundContainer) {
        for (const elementId in contentMapping) {
            createTextRetirment(mainFundContainer, elementId, contentMapping[elementId]);
        }
    }

    // risk profile performance chart

    const riskProfileContainer = document.querySelector('#perf-chart');
    if (riskProfileContainer) {
        const riskProfileData = appwData.miirf.price;
        if (riskProfileData && riskProfileData.length > 0) {
            renderRetireFundPrices(riskProfileData)
        } else {
            console.warn('No risk profile data available for MIIRF');
        }
    }

    // subfund info
    const subFunds = [appwData.miirfmmsf.info, appwData.miirfdsf.info, appwData.miirfesf.info];
    const subFundsPrice = [appwData.miirfmmsf.price, appwData.miirfdsf.price, appwData.miirfesf.price];
    const subFundsPerf = [appwData.miirfmmsf.perf, appwData.miirfdsf.perf, appwData.miirfesf.perf];

    const subFundContentMapping = {
        'asset-name': 'Name',
        'productSummary' : 'Fund Summary',
        'investmentObjective' : 'Investment Objective',
        'netAssets': "Net Assets (PKR mn)",
        'launchDate': 'Launch Date',
        'fundCategory': 'Fund Category',
        'fundAuditors': 'Fund Auditors',
        'fundManager': 'Fund manager',
        'custodian': 'Custodian',
        'i-nav' : "Latest NAV",
        'navDate': 'Latest NAV Date',
        'navDateMonth': 'Submission date',
        'expense-ratio': 'Expense Ratio',
        'mtd': 'MTD',
        'navDateMTD' : 'Latest NAV Date MTD'
    };

    // Update sub-fund info for each tab
    const subFundContainers = document.querySelectorAll('.container-12.miirf');
    subFundContainers.forEach((container, index) => {
        const subFundData = subFunds[index]; // Get data for the current sub-fund
        if (subFundData) {
            
            for (const elementId in subFundContentMapping) {
                const dataKey = subFundContentMapping[elementId];
                let value = subFundData[dataKey] || '-';

                // Special formatting for launchDate
                if (elementId === 'launchDate' && value !== '-') {
                    const dateObj = new Date(value);
                    value = moment(dateObj).format('MMM DD, YYYY'); // e.g., "May 26, 2025"
                }
                if (elementId === 'netAssets' && value !== '-') {
                    value = `PKR ${(value / 1_000_000).toFixed(1)}mn`; // Convert to millions
                }
                if (elementId === 'expense-ratio') {
                    monthlyExpense = (parseFloat(subFundData['Monthly Total Expense Ratio']) * 100).toFixed(2); // Convert to percentage
                    yearlyExpense = (parseFloat(subFundData['Yearly Total Expense Ratio']) * 100).toFixed(2); // Convert to percentage
                    console.log(`Monthly Expense: ${monthlyExpense}, Yearly Expense: ${yearlyExpense}`);
                    value = `${monthlyExpense}% (MTD) | ${yearlyExpense}% (YTD)`; // Format as "monthly% / yearly%"
                }
                if (elementId === 'navDateMonth' && value !== '-') {
                    const dateObj = new Date(value);
                    value = moment(dateObj).format('MMM DD, YYYY'); // e.g., "june 30, 2025"
                    value = `as of ${value}`; // Add "as of" prefix
                }

                createTextRetirment(container, elementId, value);
            }
        }
    });


    // update sub-fund upper nav, mtd and nav date info
    const subFundContainersMAIN = document.querySelectorAll('.w-layout-grid.uui-layout82_list.miirf');
    subFundContainersMAIN.forEach((container, index) => {
        const subFundPriceData = subFundsPrice[index];
        const subFundPerfData = subFundsPerf[index];
        if (subFundPriceData) {
            // Get latest NAV and date from price array
            let latestNav = '-';
            let latestNavDate = '-';
            let latestMTD = '-';

            if (Array.isArray(subFundPriceData) && subFundPriceData.length > 0) {
                const latest = subFundPriceData.reduce((latestSoFar, current) =>
                    new Date(current.date) > new Date(latestSoFar.date) ? current : latestSoFar
                );
                latestNav = latest.nav;
                latestNavDate = latest.date;
            }
            
            latestMTD = subFundPerfData?.[0]?.mtd != null ? `${(subFundPerfData[0].mtd * 100).toFixed(2)}%` : '-';
            
            for (const elementId in subFundContentMapping) {
                let contentValue;
                if (elementId === 'i-nav') {
                    contentValue = latestNav;
                    createTextRetirment(container, elementId, contentValue);
                } else if (elementId === 'navDate' || elementId === 'navDateMTD') {
                    contentValue = `as of ${moment(latestNavDate, 'YYYY-MM-DD').format('D MMM YYYY')}`;
                    createTextRetirment(container, elementId, contentValue);
                } else if (elementId === 'mtd') {
                    contentValue = latestMTD;
                    createTextRetirment(container, elementId, contentValue);
                }
            }
        }
    });


    // Construct appwHolding
    let appwHolding = {
        'miirfmmsf': [],
        'miirfdsf': [],
        'miirfesf': []
    };

    
    const subfunds = [
        { key: 'miirfmmsf', name: 'Money Market Sub-Fund' },
        { key: 'miirfdsf', name: 'Debt Sub-Fund' },
        { key: 'miirfesf', name: 'Equity Sub-Fund' }
    ];

    // Initialize holdings data
    subfunds.forEach(subfund => {
        if (appwData[subfund.key] && appwData[subfund.key].holdings && appwData[subfund.key].holdings.length > 0) {
            appwHolding[subfund.key] = []; // Initialize array
            appwData[subfund.key].holdings.forEach(holding => {
                appwHolding[subfund.key].push({
                    key: holding.key,
                    value: (parseFloat(holding.holding) * 100).toFixed(2)
                });
            });
        } else {
            appwHolding[subfund.key] = []; // Ensure empty array for subfunds with no holdings
        }
    });

    // Render holdings separately
    const holdingsContainers = document.querySelectorAll('.w-layout-layout.quick-stack.wf-layout-layout');
    subfunds.forEach((subfund, index) => {
        const holdingsContainer = holdingsContainers[index];
        if (holdingsContainer) {
            renderHoldings(holdingsContainer, appwHolding, subfund.key);
        } else {
            console.warn(`Holdings container not found for ${subfund.key} at index ${index}`);
        }
    });

    
    // Construct appwAssets
    let appwAsset = {
        'miirfmmsf': [],
        'miirfdsf': [],
        'miirfesf': []
    };

    subfunds.forEach(subfund => {

        if (subfund.key === "miirfesf"){
            if (appwData[subfund.key] && appwData[subfund.key].sector_holdings && appwData[subfund.key].sector_holdings.length > 0) {
                appwAsset[subfund.key] = []; // Initialize array
                appwData[subfund.key].sector_holdings.forEach(sector_holding => {
                    appwAsset[subfund.key].push({
                        key: sector_holding.key,
                        value: (parseFloat(sector_holding.holding) * 100)
                    });
                });
            } else {
                appwAsset[subfund.key] = []; // Ensure empty array for subfunds with no holdings
            }
        }
        else{
            if (appwData[subfund.key] && appwData[subfund.key].asset_alloc && appwData[subfund.key].asset_alloc.length > 0) {
                appwAsset[subfund.key] = []; // Initialize array
                appwData[subfund.key].asset_alloc.forEach(asset => {
                    appwAsset[subfund.key].push({
                        key: asset.key,
                        value: (parseFloat(asset.current_month) * 100)
                    });
                });
            } else {
                appwAsset[subfund.key] = []; // Ensure empty array for subfunds with no holdings
            }
        } 
    });

    // Render Asset Graph separately
    const assetContainers = document.querySelectorAll('.w-layout-cell.piechart.miirf');
    subfunds.forEach((subfund, index) => {
        const assetContainer = assetContainers[index];
        if (assetContainer) {
            // Check if a chart container already exists
            let chartContainer = assetContainer.querySelector('.w-embed');
            if (!chartContainer) {
                // Create a new div for the chart
                chartContainer = document.createElement('div');
                chartContainer.className = 'w-embed';
                assetContainer.appendChild(chartContainer);
            }
            
            // Assign a unique ID to the chart container
            const chartId = `chart-${subfund.key}-${index}`;
            chartContainer.id = chartId;
            
            // Get data for this subfund
            const subfundData = appwAsset[subfund.key] || [];
            
            if (subfundData.length > 0) {
                addGraph(chartId, subfundData, true);
            } else {
                console.warn(`No data found for subfund ${subfund.key}`);
                chartContainer.innerHTML = '<p>No data available</p>';
            }
        } else {
            console.warn(`Asset container not found for ${subfund.key} at index ${index}`);
        }
    });


    const performanceContainers = document.querySelectorAll('.layout-2.miirf');
    subfunds.forEach((subfund, index) => {
        const perfContainer = performanceContainers[index];
        if (perfContainer) {
            let chartContainer = perfContainer.querySelector('.code-embed-3.w-embed');
            if (!chartContainer) {
                chartContainer = document.createElement('div');
                chartContainer.className = 'code-embed-3 w-embed';
                perfContainer.appendChild(chartContainer);
            }
            
            const chartId = `perf-chart-${subfund.key}-${index}`;
            chartContainer.id = chartId;
            
            const subfundData = appwData[subfund.key]?.price || [];
            
            if (subfundData.length > 0) {
                renderSubFundPrices(subfund.key, subfundData, chartId);
            } else {
                console.warn(`No data found for subfund ${subfund.key}`);
                chartContainer.innerHTML = '<p>No data available</p>';
            }
        } else {
            console.warn(`Price container not found for ${subfund.key} at index ${index}`);
        }
    });
    
    // performances
    subfunds.forEach((subfund, index) => {
        const returnContainer = performanceContainers[index];
        if (returnContainer) {
            
            const subfundData = appwData[subfund.key]?.perf || [];
            if (subfundData.length > 0) {
                renderPerformance(subfund.key, subfundData, returnContainer);
            } else {
                console.warn(`No data found for subfund ${subfund.key}`);
                chartContainer.innerHTML = '<p>No data available</p>';
            }
        } else {
            console.warn(`Return container not found for ${subfund.key} at index ${index}`);
        }
    });


    let data = {
        id: null,
        fundInfo: fundInfo,
        overview: overview
    };

    return data;
}

async function getNonMIIRFFundData(productName, appwData) {

    const launchDate = new Date(appwData.info['Launch Date']);
    const launchDateFormatted = moment(launchDate).format('MMM DD, YYYY'); // e.g., "May 26, 2025"

    let appwFundInfo = {
        authorizedParticipant: appwData.info['Authorized Participant'],
        benchmark: appwData.info['Benchmark'],
        custodian: appwData.info['Custodian'],
        fundAuditors: appwData.info['Fund Auditors'],
        fundCategory: appwData.info['Fund Category'],
        fundManager: appwData.info['Fund manager'],
        fundStabilityRating: appwData.info['Fund Stability Rating'],
        investmentObjective: appwData.info['Investment Objective'],
        launchDate: launchDateFormatted,
        managementFee: appwData.info['Management Fee'],
        monthlyTotalExpenseRatio: appwData.info['Monthly Total Expense Ratio'],
        monthlyTotalExpenseRatioWithoutLevy: appwData.info['Monthly Total Expense Ratio (without gov levy)'],
        netAssets: appwData.info['Net Assets'],
        shariahAdvisors: appwData.info['Shariah Advisors'],
        totalExpenseRatio: null,
        totalExpenseRatioWithoutLevy: null,
        weightedAverageTime: appwData.info['Weighted Average Time to Maturity (Days)'],
        yearlyTotalExpenseRatio: appwData.info['Yearly Total Expense Ratio'],
        yearlyTotalExpenseRatioWithoutLevy: appwData.info['Yearly Total Expense Ratio (without gov levy)']
    };

    let product_summary = appwData.info['Fund Summary'] ;

    let appwOverview = {
        assetCategory: product_summary,
        description: null,
        name: appwData.info['Name'],
        navDate: format_date(latest_date),
        navPerUnit: latest_nav.toString(),
        question: 'What is Mahaana Islamic Index ETF (MIIETF)?'
    };

    let appwFmrDate = format_date(new Date(appwData.info['Submission date']));

    const appwPerformances = [];
    for (let record_num in appwData.perf) {
        let days_30 = appwData.perf[record_num]['30d'] ? (appwData.perf[record_num]['30d'] * 100).toFixed(2) + "%" : '-';
        let days_90 = appwData.perf[record_num]['90d'] ? (appwData.perf[record_num]['90d'] * 100).toFixed(2) + "%" : '-';
        let days_365 = appwData.perf[record_num]['1y'] ? (appwData.perf[record_num]['1y'] * 100).toFixed(2) + "%" : '-';

        appwPerformances.push({
            days30: days_30,
            days90: days_90,
            days365: days_365,
            inception: (appwData.perf[record_num]['inception'] * 100).toFixed(2) + "%",
            lastUpdatedOn: null,
            mtd: (appwData.perf[record_num]['mtd'] * 100).toFixed(2) + "%",
            name: appwData.perf[record_num]['name'],
            years3: null,
            years5: null,
            ytd: (appwData.perf[record_num]['ytd'] * 100).toFixed(2) + "%"
        });
    }

    let appwCreditRating = null;
    let appwWeightedExpo = null;
    if (productName === 'MIIETF') {
        appwCreditRating = {};
        appwWeightedExpo = [];
        for (let record_num in appwData.weighted_expo) {
            let key = appwData.weighted_expo[record_num].key;
            let value = appwData.weighted_expo[record_num].miietf.toFixed(2);
            appwCreditRating[key] = value;
            appwWeightedExpo.push({
                key: key,
                value: {
                    miietf: value,
                    kmi30: appwData.weighted_expo[record_num].kmi30.toFixed(2),
                    weight: appwData.weighted_expo[record_num].weight.toFixed(2)
                }
            });
        }
    }

    let appwAssetAlloc = null;
    let appwCreditQuality = null;
    if (productName === 'MICF') {
        appwAssetAlloc = [];
        for (let record_num in appwData.asset_alloc) {
            appwAssetAlloc.push({
                Name: appwData.asset_alloc[record_num].key,
                'Current month': appwData.asset_alloc[record_num].current_month,
                'Prev month': appwData.asset_alloc[record_num].prev_month
            });
        }
        appwCreditQuality = [];
        for (let record_num in appwData.distribution) {
            appwCreditQuality.push({
                key: appwData.credit_quality[record_num].key,
                value: appwData.credit_quality[record_num].value * 100
            });
        }
    }

    let appwHolding = {};
    for (let record_num in appwData.holdings) {
        let key = appwData.holdings[record_num].key;
        let value = (appwData.holdings[record_num].holding * 100).toFixed(2) + "%";
        appwHolding[key] = value;
    }

    let appwDistributions = [];
    for (let record_num in appwData.distribution) {
        let d = new Date(appwData.distribution[record_num].payout_date);
        let date_str = moment(d).format("DD/MM/YYYY HH:mm:ss");
        appwDistributions.push({
            exNav: appwData.distribution[record_num].ex_nav,
            payoutDate: date_str,
            payoutPerUnit: appwData.distribution[record_num].payout_per_unit,
            recordDate: null,
            type: "",
            yield: appwData.distribution[record_num].yield * 100
        });
    }

    let appwFmr = [];
    for (let record_num in appwData.fmr) {
        appwFmr.push({
            key: appwData.fmr[record_num].key.replaceAll(" ", "_") + ".pdf",
            value: null,
            name: appwData.fmr[record_num].key
        });
    }

    let data = {
        id: null,
        navDate: format_date(latest_date),
        benchmarkData: null,
        creditRating: appwCreditRating,
        creditQuality: appwCreditQuality,
        currentAssetAllocation: null,
        assetAllocation: appwAssetAlloc,
        distribution: null,
        distributions: appwDistributions,
        etfBenchmarkData: null,
        fmrDate: appwFmrDate,
        fundInfo: appwFundInfo,
        holding: appwHolding,
        lastAssetAllocation: null,
        monthToDateExpense: {
            key: Number(appwPerformances[0].mtd.replace("%", "")),
            value: null
        },
        offeringDocumentList: appwFmr,
        overview: appwOverview,
        performances: appwPerformances.slice(0, 2),
        weighted_exposure: appwWeightedExpo
    };

    let { offeringDocumentList, fmrDate, fundInfo, monthToDateExpense, overview, creditRating, currentAssetAllocation, holding, navDate, assetAllocation, creditQuality } = data;

    let fmrDateElement = document.querySelectorAll('body #fmrDate');
    Array.from(fmrDateElement).forEach(element => { element.textContent = "as of" + " " + moment(fmrDate, 'YYYY-MM-DD').format('D MMM YYYY') });

    let navDateElement = document.querySelectorAll('body #navDate');
    Array.from(navDateElement).forEach(element => { element.textContent = "as of" + " " + moment(navDate, 'YYYY-MM-DD').format('D MMM YYYY') });

    let expense_ratio_mtd = fundInfo?.monthlyTotalExpenseRatio > 0 ? `${fundInfo?.monthlyTotalExpenseRatio}%` : 'N/A';
    let expense_ratio_ytd = fundInfo?.yearlyTotalExpenseRatio > 0 ? `${fundInfo?.yearlyTotalExpenseRatio}%` : 'N/A';
    let expense_ratio_without_gov_mtd = fundInfo?.monthlyTotalExpenseRatioWithoutLevy > 0 ? `${fundInfo?.monthlyTotalExpenseRatioWithoutLevy}%` : 'N/A';
    let expense_ratio_without_gov_ytd = fundInfo?.yearlyTotalExpenseRatioWithoutLevy > 0 ? `${fundInfo?.yearlyTotalExpenseRatioWithoutLevy}%` : 'N/A';

    const contentMapping = {
        'asset-name': overview?.name,
        'asset-class': fundInfo.fundCategory,
        'expense-ratio-mtd': expense_ratio_mtd,
        'expense-ratio-ytd': expense_ratio_ytd,
        'expense-ratio': expense_ratio_mtd + ' (MTD) | ' + expense_ratio_ytd + ' (YTD)',
        'expense-ratio-with-gov': expense_ratio_mtd + ' (MTD) | ' + expense_ratio_ytd + ' (YTD)',
        'expense-ratio-without-gov': expense_ratio_without_gov_mtd + ' (MTD) | ' + expense_ratio_without_gov_ytd + ' (YTD)',
        'micf-mtd': `${monthToDateExpense.key.toFixed(2)}%`,
        'mtd-date': `as of ${moment(fmrDate).format('D MMM YYYY')}`,
        'nav-price': `${overview.navPerUnit.includes('.') ? Number(overview.navPerUnit).toFixed(4) : Number(overview.navPerUnit)}`,
        'nav-date': `as of ${moment(navDate, 'YYYY/MM/DD').format('D MMM YYYY')}`,
        'productSummary': overview.assetCategory,
        'fundManager': fundInfo.fundManager,
        'netAssets': fundInfo.netAssets,
        'launchDate': fundInfo.launchDate || '-',
        'fundCategory': fundInfo.fundCategory,
        'investmentObjective': fundInfo.investmentObjective,
        'benchmark': fundInfo.benchmark,
        'managementFee': fundInfo.managementFee,
        'fundAuditors': fundInfo.fundAuditors,
        'fundStabilityRating': fundInfo.fundStabilityRating && fundInfo.fundStabilityRating.trim() !== "" ? fundInfo.fundStabilityRating : "N/A",
        'authorizedParticipant': fundInfo.authorizedParticipant,
        'i-nav': `${overview.navPerUnit.includes('.') ? Number(overview.navPerUnit).toFixed(4) : Number(overview.navPerUnit)}`,
        'custodian': fundInfo.custodian,
        'shariahAdvisors': fundInfo.shariahAdvisors,
        'weightedAverageTime': fundInfo.weightedAverageTime
    };

    for (const elementId in contentMapping) {
        createText(elementId, contentMapping[elementId]);
    }

    data.creditRating = transformData(creditRating, 'table');
    data.holding = transformData(holding, 'table');

    if (productName === 'MICF') {
        addAssetAllocGraph(data.assetAllocation);
        addGraph("creditQualityChart", data.creditQuality);
    }

    if (productName === 'MIIETF') {
        addGraph("container2", data.creditRating);
    }

    addGraph("container1", data.holding);

    renderLoop(data, appwPerformances, productName);

    return data;
}



function addGraph(id, data, hasSubfund = false) {
    let transformed_data = [];
    for (let i in data) {
        transformed_data.push({
            name: data[i].key,
            y: Number(data[i].value)
        });
    }

    function getChartWidth() {
        const screenWidth = window.innerWidth;
        return screenWidth < 600 ? screenWidth * 0.6 : 600;
    }

    const chart = Highcharts.chart(id, {
        chart: {
            type: 'pie',
            width: getChartWidth(),
            backgroundColor: hasSubfund ? '#f9fafa' : null
        },
        title: {
            text: ''
        },
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        tooltip: {
            pointFormat: '{series.name} {point.y:.2f}%',
            headerFormat: '<b>{point.key}</b><br>'
        },
        colors: PIE_COLORS_NEW,
        plotOptions: {
            pie: {
                innerSize: '80%',
                size: '90%',
                depth: 45,
                // dataLabels: [{
                //     enabled: true,
                //     distance: 20,
                //     format: '{point.name}'
                // }, {
                //     enabled: false,
                //     distance: -15,
                //     format: '{point.percentage:.0f}%',
                //     style: {
                //         fontSize: '0.9em'
                //     }
                // }],
                dataLabels: {
                    enabled: false
                    // format: '<b>{point.name}</b>: {point.percentage:.2f}%'
                }
            }
        },
        series: [{
            name: '',
            data: transformed_data
        }]
    });

    window.addEventListener('resize', () => {
        chart.setSize(getChartWidth(), null);
    });
}

function addAssetAllocGraph(data) {
    let labels = []
    let curr_month = []
    let prev_month = []
    
    for(let i in data) {
        if(data[i]['Current month'] === 0 && data[i]['Prev month'] === 0)
            continue
        
        labels.push(data[i].Name)
        curr_month.push(Number((data[i]['Current month'] * 100).toFixed(2)))
        prev_month.push(Number((data[i]['Prev month'] * 100).toFixed(2)))
    }

    // console.log(labels)
    // console.log(curr_month)
    // console.log(prev_month)

    Highcharts.chart('assetAllocation', {
        chart: {
            type: 'column'
        },
        title: {
            text: null,
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false  // Disable the exporting hamburger icon
        },
        xAxis: {
            categories: labels
        },
        yAxis: {
            labels: {
                formatter: function() {
                    return (this.value + '%');
                }
            },
            title: null,
            gridLineWidth: 0
        },
        tooltip: {
            // pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.2f}%</b><br/>',
            // pointFormat: '<span style="color:{series.color}">•</span> {series.name}: <b>{(point.y * 100):.2f}%</b><br/>',
            headerFormat: '<b>{point.key}</b><br>',
            shared: true
        },
        plotOptions: {
            series: {
                pointPadding: 0,
                groupPadding: 0.2,
                borderWidth: 0,
                shadow: false
            }
        },
        series: [{
            name: 'Current month',
            data: curr_month
        },
        {
            name: 'Previous month',
    		data: prev_month
        }]
    });
}

function renderRetireFundPrices(appw_price) {
    let data = [];
    for (let item of appw_price) {
        let d = new Date(item.date);
        let date_str = d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).split('/').join('/');
        
        data.push({
            date: date_str,
            Conservative: parseFloat(item.Conservative),
            LowRisk: parseFloat(item["Low Risk"]),
            Balanced: parseFloat(item.Balanced),
            MediumRisk: parseFloat(item["Medium Risk"]),
            Aggressive: parseFloat(item.Aggressive)
        });
    }

    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset();
    
    let conservative_series = [];
    let lowRisk_series = [];
    let balanced_series = [];
    let mediumRisk_series = [];
    let aggressive_series = [];
    
    for (let item of data) {
        conservative_series.push([
            moment.utc(item.date, "DD/MM/YYYY").valueOf(),
            item.Conservative
        ]);
        lowRisk_series.push([
            moment.utc(item.date, "DD/MM/YYYY").valueOf(),
            item.LowRisk
        ]);
        balanced_series.push([
            moment.utc(item.date, "DD/MM/YYYY").valueOf(),
            item.Balanced
        ]);
        mediumRisk_series.push([
            moment.utc(item.date, "DD/MM/YYYY").valueOf(),
            item.MediumRisk
        ]);
        aggressive_series.push([
            moment.utc(item.date, "DD/MM/YYYY").valueOf(),
            item.Aggressive
        ]);
    }

    function getMinMax(data) {
        let allValues = [
            ...data.map(item => item.Conservative),
            ...data.map(item => item.LowRisk),
            ...data.map(item => item.Balanced),
            ...data.map(item => item.MediumRisk),
            ...data.map(item => item.Aggressive)
        ].filter(val => val !== null);
        return {
            min: allValues.length > 0 ? Math.min(...allValues) : 0,
            max: allValues.length > 0 ? Math.max(...allValues) : 100
        };
    }

    let {min, max} = getMinMax(data);
    min = min * 0.99;
    max = max * 1.01;

    let series = [
        {
            name: 'Conservative',
            data: conservative_series,
            color: PIE_COLORS_NEW[0] // #0E70C7
        },
        {
            name: 'Low Risk',
            data: lowRisk_series,
            color: PIE_COLORS_NEW[1] // #7719E3
        },
        {
            name: 'Balanced',
            data: balanced_series,
            color: PIE_COLORS_NEW[2] // #067D77
        },
        {
            name: 'Medium Risk',
            data: mediumRisk_series,
            color: PIE_COLORS_NEW[3] // #EB7F13
        },
        {
            name: 'Aggressive',
            data: aggressive_series,
            color: PIE_COLORS_NEW[4] // #E3193B
        }
    ];
    
    Highcharts.chart('perf-chart', {
        chart: {
            type: 'line',
        },
        title: {
            text: null,
        },
        exporting: {
            enabled: false
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            min: min,
            max: max,
            title: null,
            gridLineWidth: 0
        },
        tooltip: {
            shared: true,
            headerFormat: '<b>{point.key}</b><br>',
            xDateFormat: '%d %b %Y',
            valueDecimals: 0
        },
        credits: {
            enabled: false
        },
        colors: PIE_COLORS_NEW,
        plotOptions: {
            line: {
                fillOpacity: 0.2,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: series
    });
}

function renderSubFundPrices(productName, appw_price, chartId) {
    let data = [];
    
    for (let item of appw_price) {
        let d = new Date(item.date);
        let date_str = d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).split('/').join('/');
        
        data.push({
            date: date_str,
            navValue: parseFloat(item.ad_nav),
            performanceValue: item.benchmark ? parseFloat(item.benchmark) : null
        });
    }

    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset();
    const hoursOffset = -timezoneOffset / 60;
    
    let miirf_series = [];
    let benchmark_series = [];
    
    for (let item of data) {
        miirf_series.push([
            moment.utc(item.date, "DD/MM/YYYY").valueOf(),
            item.navValue
        ]);
        if (item.performanceValue !== null) {
            benchmark_series.push([
                moment.utc(item.date, "DD/MM/YYYY").valueOf(),
                item.performanceValue
            ]);
        }
    }

    function getMinMax(data) {
        let navValues = data.map(item => item.navValue).filter(val => val !== null);
        let benchmarkValues = data.map(item => item.performanceValue).filter(val => val !== null);
        let allValues = [...navValues, ...benchmarkValues];
        return {
            min: allValues.length > 0 ? Math.min(...allValues) : 0,
            max: allValues.length > 0 ? Math.max(...allValues) : 100
        };
    }

    let {min, max} = getMinMax(data);

    if (productName === 'miirfdsf' || productName === 'miirfmmsf') {
        min = min * 0.995;
        max = max * 1.005;
    }
    else{
        min = min * 0.99;
        max = max * 1.01;
    }
    const subfunds = [
        { key: 'miirfmmsf', name: 'Money Market' },
        { key: 'miirfdsf', name: 'Debt' },
        { key: 'miirfesf', name: 'Equity' }
    ];


    let series = [{
        name: subfunds.find(f => f.key === productName)?.name || productName,
        data: miirf_series,
    }];
    if (benchmark_series.length > 0) {
        series.push({
            name: 'Benchmark',
            data: benchmark_series,
        });
    }
    
    Highcharts.chart(chartId, {
        chart: {
            type: 'line',
            backgroundColor: '#f9fafa'
        },
        title: {
            text: null,
        },
        exporting: {
            enabled: false
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            min: min,
            max: max,
            title: null,
            gridLineWidth: 0
        },
        tooltip: {
            shared: true,
            headerFormat: '<b>{point.key}</b><br>',
            xDateFormat: '%d %b %Y',
            valueDecimals: 2
        },
        credits: {
            enabled: false
        },
        colors: [PIE_COLORS_NEW[0], PIE_COLORS_NEW[1]],
        plotOptions: {
            line: {
                fillOpacity: 0.2,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: series
    });
}

function getFundPrices(productName, appw_price) {
    appw_price_reformed = []
    
    for (item in appw_price) {
        let d = new Date(appw_price[item].date)
        let date_str = moment(d).format('DD/MM/YYYY');
        
        appw_price_reformed.push({
            date: date_str,
            navValue: appw_price[item].nav_adjusted,
            performanceValue: appw_price[item].benchmark,
            kmi30: appw_price[item].kmi30,
            peer_avg: appw_price[item].peer_avg,
        })
    }

    // console.log('appw_price_reformed')
    console.log(appw_price_reformed)

    latest_date = new Date(appw_price[appw_price.length - 1].date)
    latest_nav = appw_price[appw_price.length - 1].nav

    // console.log('latest_date')
    // console.log(latest_date)

    // console.log('latest_nav')
    // console.log(latest_nav)
    
    renderPerfChart(appw_price_reformed, productName)

    let totalReturnDate = document.querySelector('#totalReturnsDate');
    // const lastDate = airPerfData[airPerfData.length - 1].date;
    const lastDate = appw_price_reformed[appw_price_reformed.length - 1].date
    if (totalReturnDate) {
        totalReturnDate.textContent = `as of ${moment(lastDate, 'DD/MM/YYYY').format('D MMM YYYY')}`;
    }
}

function renderPerfChart(data, productName) {
    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset();
    const hoursOffset = -timezoneOffset / 60;
    // console.log('hoursOffset');
    // console.log(hoursOffset);
    
    let miietf_series = []
    let benchmark_series = []
    let kmi30_series = []
    let peer_series = []

    let max_val = null
    let min_val = null
    
    for (let i in data) {
        miietf_series.push([
            moment(data[i].date, "DD/MM/YYYY").unix() * 1000 + hoursOffset * (1000 * 60 * 60),
            data[i].navValue
        ])
        
        benchmark_series.push([
            moment(data[i].date, "DD/MM/YYYY").unix() * 1000 + hoursOffset * (1000 * 60 * 60), 
            data[i].performanceValue
        ])

        if(productName === 'MIIETF') {
            kmi30_series.push([
                moment(data[i].date, "DD/MM/YYYY").unix() * 1000 + hoursOffset * (1000 * 60 * 60), 
                data[i].kmi30
            ])
        }

        if(productName === 'MICF') {
            peer_series.push([
                moment(data[i].date, "DD/MM/YYYY").unix() * 1000 + hoursOffset * (1000 * 60 * 60), 
                data[i].peer_avg
            ])    
        }
         
    }

    // console.log("data")
    // console.log(data)

    let {min, max} = getMinMax(data, productName)
    min = min * 0.85
    max = max * 1.15

    // console.log('min')
    // console.log(min)
    // console.log('max')
    // console.log(max)

    let series

    if (productName === 'MICF') {
        series = [
            {
                name: 'MICF',
                data: miietf_series,
            },
            {
                name: 'Benchmark',
                data: benchmark_series,
            }
        ]
    }
    console.log(miietf_series);

    if (productName === 'MIIETF') {
        series = [
            {
                name: 'MIIETF',
                data: miietf_series,
            },
            {
                name: 'Benchmark',
                data: benchmark_series,
            },
            {
                name: 'KMI30',
                data: kmi30_series,
            }
        ]
    }

    // if (productName === 'MIIETF') {
    //     series.push({
    //         name: 'KMI30',
    //         data: kmi30_series
    //     })
    //     // series.push({
    //     //     name: 'Peer Avg.',
    //     //     data: peer_series,
    //     // })
    // }
    // if (productName === 'MICF') {
    //     series.push({
    //         name: 'Peer Avg.',
    //         data: peer_series,
    //     })
    // }

    // console.log('series')
    // console.log(series)
    
    Highcharts.chart('perf-chart', {
        chart: {
            type: 'line'
        },
        title: {
            text: null,
        },
        exporting: {
            enabled: false  // Disable the exporting hamburger icon
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            min: min,
            max: max,
            title: null,
            gridLineWidth: 0
        },
        tooltip: {
            shared: true,
            headerFormat: '<b>{point.key}</b><br>',
            xDateFormat: '%d %b %Y',
            valueDecimals: 2
            // pointFormat: '<b>{point.y:.2f}</b>'
            // xDateFormat: moment(this.x, 'dddd, D MMM, HH:mm').format('D MMM YYYY')
            // xDateFormat: console.log(this.x)
        },
        credits: {
            enabled: false
        },
        colors: PIE_COLORS_NEW,
        plotOptions: {
            line: {
                fillOpacity: 0.2,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                    	}
                  	}
            	}
            }
        },
        series: series
    }); 
}

function getMinMax(arr, productName) {
    if (productName === 'MIIETF') {
        return arr.reduce((acc, obj) => {
            acc.min = Math.min(
                acc.min, 
                obj.navValue, 
                obj.performanceValue, 
                obj.kmi30,
                // obj.peer_avg
            );
            acc.max = Math.max(
                acc.max, 
                obj.navValue, 
                obj.performanceValue, 
                obj.kmi30,
                // obj.peer_avg
            );
            return acc;
        }, { min: Infinity, max: -Infinity });    
    }

    if (productName === 'MICF') {
        return arr.reduce((acc, obj) => {
            acc.min = Math.min(
                acc.min, 
                obj.navValue, 
                obj.performanceValue
            );
            acc.max = Math.max(
                acc.max, 
                obj.navValue, 
                obj.performanceValue
            );
            return acc;
        }, { min: Infinity, max: -Infinity });    
    }

    if (productName === 'MIIRF') {
        return arr.reduce((acc, obj) => {
            acc.min = Math.min(
                acc.min, 
                obj.navValue, 
                obj.performanceValue, 
            );
            acc.max = Math.max(
                acc.max, 
                obj.navValue, 
                obj.performanceValue, 
            );
            return acc;
        }, { min: Infinity, max: -Infinity });    
    }
    
}

// convert date to this format: 2024-11-01 
function format_date(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`; // Output: "2024-07-24"
    return formattedDate
}


function day_between_dates(dateLater, dateEarlier) {
    return (dateLater.getTime() - dateEarlier.getTime()) / (1000 * 3600 * 24)
}

async function main() {
    console.log('main function started')
    loader = createLoader();
    loader.style.display = 'flex';

    // let airtable = new Airtable({apiKey: 'patnDPQnOez6XuH3I.acbafbff38cb2659ad2a74247aa50db04dc276aaccda314aedf7df118f6bf3e2'})
    // let miietfBase = airtable.base('app9fpjsdlh5R7gsq')
    // let micfBase = airtable.base('app3KpgeOesdEHazM')

    let productName = document.querySelector('#product_name').innerText
    console.log(productName)

    if (productName === 'MIIETF') {
        let appwData = await getAppWriteData(productName)
        
        getFundPrices(productName, appwData.price)
        await getFundData(productName, appwData)
    } 
    else if (productName === 'MICF') {
        let appwData = await getAppWriteData(productName)

        getFundPrices(productName, appwData.price)
        await getFundData(productName, appwData)
    }

    else if (productName === 'MIIRF') {
        console.log('MIIRF')
        let appwData = await getAppWriteData(productName)

        await getFundData(productName, appwData)
    }

    // Close the loader
    setTimeout(() => {
        loader.style.display = 'none';
        const fragmentIdentifier = window.location.hash;

        if (fragmentIdentifier) {
            // Remove the '#' symbol from the fragment identifier
            const targetId = fragmentIdentifier.substring(1);

            // Find the target element by its id
            const targetElement = document.getElementById(targetId);

            // Scroll to the target element if it exists
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, 1000);
}

main()

// BODY
var currentUrl = window.location.href; var updatedUrl = currentUrl.replace(/[?&]section=[^&]+/, ''); if (currentUrl !== updatedUrl) { window.history.replaceState(null, null, updatedUrl); }; $(document).ready(function () { $('.tab-item').click(function (event) { event.stopPropagation(); }); $("html, body").animate({ scrollTop: 0 }, "slow"); $(window).on('load', function () { $(".tab-item").removeClass("w--current", "active") }); }); document.addEventListener("DOMContentLoaded", function () { tabStopHandler(); tabHandler(); }); document.addEventListener("scroll", scrollHandler);

function getFormattedDate(date) { const navDate = moment(date, "DDMMYYYY").format('DD MMM YYYY'); return "as of " + navDate };

function displayReports(reportsData) {
    // const startIndex = (currentPage - 1) * itemsPerPage; const endIndex = startIndex + itemsPerPage;
    // const displayedData = reportsData?.slice(startIndex, endIndex) || [];

    // console.log('reportsData')
    // console.log(reportsData)
    
    // console.log('reportsBodyContainer')
    // console.log(reportsBodyContainer)
    
    if (reportsBodyContainer) {
        reportsData.forEach((data) => {
            const url = `${mahaanaWealthCashFund}/api/Document/${data.key.split('.')[0]}`;

            const row = document.createElement('div');
            // row.classList.add('reports-body-row');
            row.classList.add('uui-career03_item');

            const html = `
                <div class="uui-career03_title-wrapper">
                    <div class="uui-career03_title-heading">
                        <div class="uui-career03_heading">${data.name || data.key}</div>
                    </div>
                    <a data-w-id="cb583f7d-3dca-0375-9002-e365bf4339fb" href="${url}" class="uui-button-link-3 w-inline-block" target="_blank">
                        <div class="link">Download Report</div>
                        <div class="uui-button-icon-3 w-embed" style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.83301 14.1668L14.1663 5.8335M14.1663 5.8335H5.83301M14.1663 5.8335V14.1668" stroke="CurrentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                    </a>
                </div>
            `;
            
            row.innerHTML = html; reportsBodyContainer.appendChild(row)
        })
    }

}

function goToPage(page) { if (page >= 1 && page <= Math.ceil((reportsData.length || 0) / itemsPerPage)) { currentPage = page; window.currentPage = displayReports(reportsData) } }
const graphDurs = [{ key: '1Y', value: 12 }, { key: '2Y', value: 24 }, { key: '3Y', value: 36 }];
// const durationContainerNew = document.getElementById('new-graph-duration'); 
if (durationContainerNew) { while (durationContainerNew.firstChild) { durationContainerNew.removeChild(durationContainerNew.firstChild); } graphDurs.forEach(item => { const durationDiv = document.createElement('div'); durationDiv.className = 'duration'; durationDiv.textContent = item.key; if (item.key === '3Y') { durationDiv.classList.add('selected') } durationDiv.addEventListener('click', () => { const selectedDiv = document.querySelector('.duration.selected'); if (selectedDiv) { selectedDiv.classList.remove('selected') } durationDiv.classList.add('selected'); getFundData2(item.value); }); if (durationContainerNew) { durationContainerNew.appendChild(durationDiv); } }); const svgDiv = document.createElement('div'); svgDiv.className = 'html-embed-50 w-embed'; svgDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M4.75 0.75C4.75 0.334375 4.41563 0 4 0C3.58437 0 3.25 0.334375 3.25 0.75V2H2C0.896875 2 0 2.89687 0 4V4.5V6V14C0 15.1031 0.896875 16 2 16H12C13.1031 16 14 15.1031 14 14V6V4.5V4C14 2.89687 13.1031 2 12 2H10.75V0.75C10.75 0.334375 10.4156 0 10 0C9.58438 0 9.25 0.334375 9.25 0.75V2H4.75V0.75ZM1.5 6H12.5V14C12.5 14.275 12.275 14.5 12 14.5H2C1.725 14.5 1.5 14.275 1.5 14V6ZM3 8.75C3 9.16562 3.33437 9.5 3.75 9.5H10.25C10.6656 9.5 11 9.16562 11 8.75C11 8.33438 10.6656 8 10.25 8H3.75C3.33437 8 3 8.33438 3 8.75ZM3.75 11C3.33437 11 3 11.3344 3 11.75C3 12.1656 3.33437 12.5 3.75 12.5H7.25C7.66563 12.5 8 12.1656 8 11.75C8 11.3344 7.66563 11 7.25 11H3.75Z" fill="#667085"></path></svg>`; durationContainerNew.appendChild(svgDiv); }


// ---------------------------------------------- //


// function tabStopHandler(){Webflow.push(function(){document.querySelectorAll(".tab-item").forEach(function(e){e.addEventListener("click",function(e){e.preventDefault(),$(document).off("click")})})})}function tabHandler(){let e=document.querySelectorAll(".tab-item"),t=document.querySelector(".navbar-3"),n=t.getBoundingClientRect().height;e.forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();let r=document.querySelector(e.getAttribute("href"));!function e(t){let r=document.querySelector(".tabs-menu").classList.contains("fixed"),l=t.getBoundingClientRect();window.scrollTo({top:l.top+window.scrollY+(r?-190:-n-170),behavior:"smooth"});let o=t.id;if(o){let i=new URL(window.location.href);i.searchParams.set("section",o),window.history.replaceState(null,null,i)}}(r);let l=document.querySelector(".tabs-menu");l.classList.add("fixed")})})}function scrollHandler(){let e=document.querySelector(".tabs-menu"),t=document.querySelector(".tabs-content"),n=document.querySelector("#tab-wrapper"),r=document.querySelectorAll(".tab-content-container"),l=document.querySelectorAll(".tab-item"),o;if(e){o=e.classList.contains("fixed");let i=new IntersectionObserver(function t(r){r[0].isIntersecting&&window.scrollY>=600&&window.innerWidth>=768?(e.classList.add("fixed"),n.style.paddingTop="64px"):(e.classList.remove("fixed"),n.style.paddingTop="10px")});i.observe(t);let c=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let t=o?200:250,n=e.target.id,r=document.querySelectorAll(`.tab-item[href="#${n}"]`);e.boundingClientRect.top<=t&&e.intersectionRatio>0?(l.forEach(e=>e.classList.remove("active")),r.forEach(e=>e.classList.add("active"))):r.forEach(e=>e.classList.remove("active"))}})},{threshold:.2});r.forEach(e=>{c.observe(e)})}}function removePer(e){return String(e).includes("%")?e.replace("%",""):e}function transformData(e,t){return e&&Object.entries(e).map(([e,n])=>({key:e,value:"table"===t?removePer(n):Number(n?.toString()?.replace("%",""))})).filter(e=>e.value>0)}const setTextContent=(e,t)=>{let n=document.getElementById(e);n&&(n.textContent=t)};
 
