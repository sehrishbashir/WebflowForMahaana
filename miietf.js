const Airtable = require('airtable');

// ---------------- MICF PAGE ---------------- //
let reportsData;
itemsPerPage = 5;
currentPage = 1;
let latest_nav = null
let latest_date = null
let loader = null

let weighted_exposure = null

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

const PIE_COLORS_NEW = ['#583EB1', '#43BED8', '#9575FF', '#4382D8', '#85EBFF', '#5D9631', '#583EB1', '#43BED8', '#9575FF', '#4382D8', '#85EBFF', '#5D9631'];

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

function renderLoop(data, airPerformances) {
    let { performances, holding, creditRating, distributions, overAllCreditRating, currentAssetAllocation } = data;

    performances = airPerformances
    
    const dataMappingsUpdated = [
        // { elementClass: '.assetallocation-list', data: currentAssetAllocation },
        { elementClass: '.credit-list', data: creditRating },
        { elementClass: '.holding-list', data: holding }
    ];

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

            performances.forEach(data => {
                // console.log(data)
                
                const row = document.createElement('div');
                row.classList.add('table-row');
                const html = `<div class="div-block-406 _2"><img width="16" src="https://cdn.prod.website-files.com/647f1d0084dd393f468d58a6/66668a5b5b769b78a21062ab_Vectors-Wrapper.svg" alt="" class="image-79"></div><div class="table-box _2"><div class="table-data name"><strong class="bold-text">${data?.name || '-'}<br></strong></div></div><div class="table-box _3"><div class="table-data name">${data.mtd || '-'}</div></div><div class="table-box _3"><div class="table-data name">${data.ytd || '-'}</div></div><div class="table-box _3"><div class="table-data name">${data.days90 || '-'}</div></div><div class="table-box _3"><div class="table-data name">${data.days365 || '-'}</div></div><div class="table-box _3"><div class="table-data name">${data.inception || '-'}</div></div>`

                
                //<div class="div-block-406 _2"><img width="16"
                //    src="https://cdn.prod.website-files.com/647f1d0084dd393f468d58a6/66668a5b5b769b78a21062ab_Vectors-Wrapper.svg"
                //    alt="" class="image-79"></div>
                
                // const html = `
                // <div class="div-block-406 _2" style="display: flex;">
                //     <svg style="margin-right: 6px" xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none"><circle cx="3.5" cy="9.04102" r="3" fill="#dcb787"></circle></svg>
                // <div>
                // <div class="table-box _2">
                //     <div class="table-data name"><strong class="bold-text">${data?.name || '-'}<br></strong></div>
                // </div>
                // <div class="table-box _3">
                //     <div class="table-data name">${data.mtd || '-'}</div>
                // </div>
                // <div class="table-box _3">
                //     <div class="table-data name">${data.ytd || '-'}</div>
                // </div>
                // <div class="table-box _3">
                //     <div class="table-data name">${data.days90 || '-'}</div>
                // </div>
                // <div class="table-box _3">
                //     <div class="table-data name">${data.days365 || '-'}</div>
                // </div>
                // `
                
                // const selectedColor = data?.name?.toLowerCase().includes('miietf') ? "#2E90FA" : "#62529B";
                // const html = `<div class="div-block-98" style="background-color: ${selectedColor}"></div><div class="table-content-area"><h3 class="table-title">${data?.name || '-'}</h3><div class="div-block-99"><div class="div-block-100"><div class="text-block-37">MTD</div><div class="text-block-38">${data.mtd || '-'}</div></div><div class="div-block-100"><div class="text-block-37">YTD</div><div class="text-block-38">${data.ytd || '-'}</div></div><div class="div-block-100"><div class="text-block-37">90 DAYS</div><div class="text-block-38">${data.days90 || '-'}</div></div><div class="div-block-100"><div class="text-block-37">1Y</div><div class="text-block-38">${data.days365 || '-'}</div></div></div></div>`;
                row.innerHTML = html;
                performanceRowsDiv.appendChild(row);
            })
        }
    }

    if (currentAssetAllocation) {
        const portfolioDataContainer = document.querySelector('.portfolio-data-container');
        if (portfolioDataContainer) {
            while (portfolioDataContainer.firstChild) {
                portfolioDataContainer.removeChild(portfolioDataContainer.firstChild)
            }
            currentAssetAllocation.forEach((data, index) => {

                // console.log(data)
                
                const row = document.createElement('div');
                row.classList.add('table-item');
                const returnVal = typeof (data.value) == 'string' ? data.value : (data.value).toFixed(2);
                const selectedColor = PIE_COLORS_NEW[index];

                const html = `
                <div class="table-content-area">
                    <div style="display: flex; gap: 14px">
                        <div class="div-block-101" style="display: flex;">
                            <svg style="margin-right: 6px" xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none"><circle cx="3.5" cy="9.04102" r="3" fill=${selectedColor}></circle></svg>
                        <div>
                        <div class="text-block-37">${data.key}</div>
                        <div class="text-block-38">${returnVal}%</div>
                    </div>
                </div>
                `; row.innerHTML = html; portfolioDataContainer.appendChild(row)
            })
        }
    }

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

const demoData = {
    "id": "65d832484b0efa092190560b",
    "overview": {
        "name": "Mahaana Islamic Index ETF as",
        "assetCategory": "MIIETF is a Shariah-compliant equity index fund that primarily invests in the top 30, free float weighted Islamic stocks that have an annual average turnover of more than PKR 10 million. MIIETF provides investors the long term benefits of equity markets.",
        "question": "What is Mahaana Islamic Cash Fund (MICF)?",
        "description": "",
        "navDate": "2024/02/22",
        "navPerUnit": "10735.3598"
    },
    "fundInfo": {
        "netAssets": "PKR 25 mn",
        "launchDate": "Mar 04, 2024",
        "fundCategory": "Open-end Shariah Compliant Equity ETF",
        "investmentObjective": "Investment objective is to provide competitive equity market returns with maximum coverage of the broader Islamic index at lowest possible cost.",
        "benchmark": "Mahaana Islamic Index",
        "managementFee": "Up to 1% of average net assets during the month",
        "monthlyTotalExpenseRatio": 0.20,
        "yearlyTotalExpenseRatio": 0.20,
        "fundAuditors": "BDO Ebrahim & Co.",
        "fundStabilityRating": "N/A",
        "fundManager": "Mahaana Wealth Limited",

        // New
        "authorizedParticipant": "JS Global Capital Limited",

        // Not used anymore
        "totalExpenseRatio": null,
        "totalExpenseRatioWithoutLevy": null,
        "monthlyTotalExpenseRatioWithoutLevy": 0.07,
        "yearlyTotalExpenseRatioWithoutLevy": 0.07,
        "weightedAverageTime": "47.00",
        "custodian": "Central Depository Company of Pakistan Limited",
        "shariahAdvisors": "Al Hilal Shariah Advisors"
    },
    "fmrDate": "2024-02-29",

    // New section instead of asset allocation but like credit quality
    "assetAllocation": {
        "Equity": "97.50",
        "Cash": "2.00",
        "Other assets ": "0.50"
    },

    // Not used anymore
    "currentAssetAllocation": {
        "Bank Deposits": 34.22,
        "GoP Ijarah Sukuks": 60.59,
        "Short Term Sukuk": 0.00,
        "Certificate of Investments": 0.00,
        "Other assets ": 5.19
    },
    // Not used anymore
    "lastAssetAllocation": {
        "Bank Deposits": 34.66,
        "GoP Ijarah Sukuks": 61.88,
        "Short Term Sukuk": 0.00,
        "Certificate of Investments": 0.00,
        "Other assets ": 3.46
    },

    // "Credit quality" rename to "Sector allocation"
    "creditRating": {
        "OIL & GAS EXPLORATION COMPANIES": "17.65",
        "CEMENT": "17.09",
        "FERTILIZER": "16.06",
        "TECHNOLOGY & COMMUNICATION": "11.67",
        "POWER GENERATION & DISTRIBUTION": "9.53",
        "Others": "25.50"
    },
    "holding": {
        "Systems Limited": "11",
        "Engro Corporation": "10",
        "Hub Power Energy Company": "10",
        "Lucky Cement Limited": "8",
        "Oil & Gas Development Company": "7",
        "Engro Fertilizers Limited": "6",
        "Pakistan Petroleum Limited": "6",
        "Meezan Bank Limited": "6",
        "Mari Petroleum Limited": "5",
        "Millat Tractors Limited": "4"
    },
    "distribution": {},
    "distributions": [],
    "performances": [
        {
            "name": null,
            "lastUpdatedOn": null,
            "mtd": "19.86%",
            "ytd": "23.62%",
            "days30": null,
            "days90": "24.63%",
            "days365": null,
            "years3": null,
            "years5": null,
            "inception": null
        },
        {
            "name": "Benchmark return",
            "lastUpdatedOn": null,
            "mtd": "10.75%",
            "ytd": "9.54%",
            "days30": null,
            "days90": "10.45%",
            "days365": null,
            "years3": null,
            "years5": null,
            "inception": null
        }
    ],
    "benchmarkData": null,
    "monthToDateExpense": {
        "key": -7.05,
        "value": "2024-02-22T00:00:00Z"
    },
    "offeringDocumentList": [
        {
            "key": "OfferingDocument.pdf",
            "value": "#",
            "name": "OfferingDocument.pdf"
        }
    ]
}

async function getFundData(airBase, airPerformances, productName) {
    try {
        //////////////
        // AIRTABLE //
        //////////////

        /////////////////////////
        // FundInfo & Overview //
        
        let airFundInfo = {
            authorizedParticipant: null,
            benchmark: null,
            custodian: null,
            fundAuditors: null,
            fundCategory: null,
            fundManager: null,
            fundStabilityRating: null,
            investmentObjective: null,
            launchDate: null,
            managementFee: null,
            monthlyTotalExpenseRatio: null,
            monthlyTotalExpenseRatioWithoutLevy: null,
            netAssets: null,
            shariahAdvisors: null,
            totalExpenseRatio: null,
            totalExpenseRatioWithoutLevy: null,
            weightedAverageTime: null,
            yearlyTotalExpenseRatio: null,
            yearlyTotalExpenseRatioWithoutLevy: null,
        }

        let airOverview = {
            assetCategory: null,
            description: null,
            name: null,
            // navDate: "2024/07/18",
            navDate: format_date(latest_date),
            navPerUnit: latest_nav.toString(),
            question: null,
        }

        let airFmrDate = null
        
        await airBase('Info').select({
            maxRecords: 100,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                // console.log(record.fields)

                if (record.fields.Key === 'Name'){
                    airOverview.name = record.fields.Value
                }
                if (record.fields.Key === 'What is Mahaana Islamic Index ETF (MIIETF)?'){
                    airOverview.assetCategory = record.fields.Value
                    airOverview.question = record.fields.Key
                }
                if (record.fields.Key === 'Net Assets'){
                    airFundInfo.netAssets = record.fields.Value
                }
                if (record.fields.Key === 'Launch Date'){
                    airFundInfo.launchDate = record.fields.Value
                }
                if (record.fields.Key === 'Fund Category'){
                    airFundInfo.fundCategory = record.fields.Value
                }
                if (record.fields.Key === 'Investment Objective'){
                    airFundInfo.investmentObjective = record.fields.Value
                }
                if (record.fields.Key === 'Benchmark'){
                    airFundInfo.benchmark = record.fields.Value
                }
                if (record.fields.Key === 'Authorized Participant'){
                    airFundInfo.authorizedParticipant = record.fields.Value
                }
                if (record.fields.Key === 'Management Fee'){
                    airFundInfo.managementFee = record.fields.Value
                }
                if (record.fields.Key === 'Monthly Total Expense Ratio'){
                    airFundInfo.monthlyTotalExpenseRatio = record.fields.Value
                }
                if (record.fields.Key === 'Yearly Total Expense Ratio'){
                    airFundInfo.yearlyTotalExpenseRatio = record.fields.Value
                }
                
                if (record.fields.Key === 'Fund Auditors'){
                    airFundInfo.fundAuditors = record.fields.Value
                }
                if (record.fields.Key === 'Fund Stability Rating'){
                    airFundInfo.fundStabilityRating = record.fields.Value
                }
                if (record.fields.Key === 'Fund manager'){
                    airFundInfo.fundManager = record.fields.Value
                }
                if (record.fields.Key === 'Submission date'){
                    airFmrDate = format_date(new Date(record.fields.Value))
                }
            })

            fetchNextPage()
        })
    
        // console.log('airFundInfo')
        // console.log(airFundInfo)
        // console.log('airOverview')
        // console.log(airOverview)

        ///////////////////////
        // Weighted Exposure //

        let airCreditRating = []
        let airCreditRatingGraph = {}
        
        // console.log('Weighted_exposure')
        await airBase('Weighted_exposure').select({
            maxRecords: 100,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                // console.log(record.fields)
                
                airCreditRating.push({
                    key: record.fields.key,
                    value: {
                        miietf: record.fields.miietf.toString(),
                        kmi30: record.fields.kmi30.toString(),
                        weight: record.fields.weight.toString()
                    }
                })

                airCreditRatingGraph[record.fields.key] = record.fields.miietf.toString()
            })

            fetchNextPage()
        })

        weighted_exposure = airCreditRating

        // console.log('airCreditRating')
        // console.log(airCreditRating)
        // console.log('airCreditRatingGraph')
        // console.log(airCreditRatingGraph)

        //////////////
        // Holdings //

        let airHoldings = {}
        
        await airBase('Holdings').select({
            maxRecords: 100,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                // console.log(record.fields)

                airHoldings[record.fields.Name] = `${(record.fields.Holding * 100).toFixed(2)}%` 
                    
                // airHoldings.push({
                //     key: record.fields.Name,
                //     value: (record.fields.Holding * 100).toFixed(2)
                // })
            })

            fetchNextPage()
        })

        // console.log('airHoldings')
        // console.log(airHoldings) 

        ///////////////////
        // Distributions //

        let airDistributions = []

        // console.log('Distributions')
        await airBase('Distributions').select({
            maxRecords: 100,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                // console.log(record.fields)

                formatted_date = new Date(record.fields.payout_date).toLocaleString('en-GB').replace(",", "")

                distrib_obj = {
                    exNav: record.fields.ex_nav,
                    payoutDate: formatted_date,
                    payoutPerUnit: record.fields.payout_per_unit,
                    recordDate: null,
                    type: "",
                    yield: record.fields.yield * 100
                }

                airDistributions.push(distrib_obj)
            })

            fetchNextPage()
        })

        // console.log('airDistributions')
        // console.log(airDistributions)

        //////////
        // FMRs //

        let airFMRs = []
        
        // console.log('FMRs')
        await airBase('FMRs').select({
            maxRecords: 100,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                // console.log(record.fields)

                airFMRs.push({
                    key: `${record.fields.Name.replaceAll(" ", "_")}.pdf`,
                    value: null,
                    name: record.fields.Name
                })
            })

            fetchNextPage()
        })

        // console.log('airFMRs')
        // console.log(airFMRs)
        
        
        //////////////////////
        // MAHANANA BACKEND //
        //////////////////////
        // let response = await fetch(`${mahaanaWealthCashFund}/api/CashFund/miietf`); if (!response.ok) { throw new Error('Network response was not ok') };

        // const response = await fetch(`https://stg-mahaana-wealth-cashfund.azurewebsites.net/api/CashFund/miietf`); if (!response.ok) { throw new Error('Network response was not ok') };
        // let dataJson = await response.json()

        // console.log('dataJson') 
        // console.log(dataJson)

        // let data = dataJson;

        // console.log('airHoldings') 
        // console.log(airHoldings)

        // console.log('airPerformances')
        // console.log(airPerformances)

        let data = {
            id: null,
            // id: dataJson.id,
            navDate: format_date(latest_date),
            benchmarkData: null,
            creditRating: airCreditRatingGraph,
            currentAssetAllocation: null,
            distribution: null,
            // currentAssetAllocation: dataJson.currentAssetAllocation,
            // distribution: dataJson.distribution,
            distributions: airDistributions,
            etfBenchmarkData: null,
            fmrDate: airFmrDate, 
            fundInfo: airFundInfo,
            holding: airHoldings, 
            lastAssetAllocation: null,
            // lastAssetAllocation: dataJson.lastAssetAllocation,
            monthToDateExpense: {
                key: Number(airPerformances[0].mtd.replace("%", "")),
                value: null
            },
            // monthToDateExpense: dataJson.monthToDateExpense,
            offeringDocumentList: airFMRs,
            overview: airOverview,
            performances: airPerformances.slice(0, 2),
            // performances: dataJson.performances,
        }

        console.log('data')
        console.log(data)

        // console.log('data.creditRating')  
        // console.log(data.creditRating)
        // console.log('airCreditRatingGraph')
        // console.log(airCreditRatingGraph)

        // data.fundInfo = airFundInfo
        // data.fmrDate = airFmrDate
        // data.overview = airOverview
        // data.creditRating = airCreditRatingGraph
        // data.holding = airHoldings
        
        let { offeringDocumentList, fmrDate, fundInfo, monthToDateExpense, overview, creditRating, currentAssetAllocation, holding, navDate } = data;

        // console.log('data')
        // console.log(data)
        
        // fundInfo = airFundInfo
        // fmrDate = airFmrDate
        // overview = airOverview
        // creditRating = airCreditRatingGraph
        
        let fmrDateElement = document.querySelectorAll('body #fmrDate');
        Array.from(fmrDateElement).forEach(element => { element.textContent = "as of" + " " + moment(fmrDate, 'YYYY-MM-DD').format('D MMM YYYY') });

        let navDateElement = document.querySelectorAll('body #navDate');
        Array.from(navDateElement).forEach(element => { element.textContent = "as of" + " " + moment(navDate, 'YYYY-MM-DD').format('D MMM YYYY') });

        let expense_ratio_mtd = fundInfo?.monthlyTotalExpenseRatio > 0 ? `${fundInfo?.monthlyTotalExpenseRatio}%` : 'N/A'
        let expense_ratio_ytd = fundInfo?.yearlyTotalExpenseRatio > 0 ? `${fundInfo?.yearlyTotalExpenseRatio}%` : 'N/A'
        
        const contentMapping = {
            'asset-name': overview?.name,
            'asset-class': fundInfo.fundCategory,
            'expense-ratio-mtd': expense_ratio_mtd,
            'expense-ratio-ytd': expense_ratio_ytd,
            'expense-ratio': expense_ratio_mtd + ' (MTD) | ' + expense_ratio_ytd + ' (YTD)',
            'micf-mtd': `${monthToDateExpense.key.toFixed(2)}%`,
            // 'mtd-date': `as of ${moment(monthToDateExpense.value).format('D MMM YYYY')}`,
            'mtd-date': `as of ${moment(fmrDate).format('D MMM YYYY')}`,
            'nav-price': `${overview.navPerUnit.includes('.') ? Number(overview.navPerUnit).toFixed(4) : Number(overview.navPerUnit)}`,
            // 'nav-date': `as of ${moment(overview.navDate, 'YYYY/MM/DD').format('D MMM YYYY')}`,
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
            // 'fundAuditors': fundInfo.fundStabilityRating,
            // 'fundStabilityRating': fundInfo.fundManager,
            'fundStabilityRating': fundInfo.fundStabilityRating,
            'authorizedParticipant': fundInfo.authorizedParticipant,
            'i-nav': `${overview.navPerUnit.includes('.') ? Number(overview.navPerUnit).toFixed(4) : Number(overview.navPerUnit)}`,
        };

        // console.log('fundInfo')
        // console.log(fundInfo)

        // const contentMapping = {
        //     'asset-name': overview?.name,
        //     'asset-class': fundInfo.fundCategory,
        //     'expense-ratio-mtd': fundInfo?.monthlyTotalExpenseRatio > 0 ? `${fundInfo?.monthlyTotalExpenseRatio}%` : 'N/A',
        //     'expense-ratio-ytd': fundInfo?.yearlyTotalExpenseRatio > 0 ? `${fundInfo?.yearlyTotalExpenseRatio}%` : 'N/A',
        //     'micf-mtd': `${monthToDateExpense.key.toFixed(2)}%`,
        //     // 'mtd-date': `as of ${moment(monthToDateExpense.value).format('D MMM YYYY')}`,
        //     'mtd-date': `as of ${moment(fmrDate).format('D MMM YYYY')}`,
        //     'nav-price': `${overview.navPerUnit.includes('.') ? Number(overview.navPerUnit).toFixed(4) : Number(overview.navPerUnit)}`,
        //     // 'nav-date': `as of ${moment(overview.navDate, 'YYYY/MM/DD').format('D MMM YYYY')}`,
        //     'nav-date': `as of ${moment(navDate, 'YYYY/MM/DD').format('D MMM YYYY')}`,
        //     'productSummary': overview.assetCategory,
        //     'fundManager': fundInfo.fundManager,
        //     'netAssets': fundInfo.netAssets,
        //     'launchDate': fundInfo.launchDate || '-',
        //     'fundCategory': fundInfo.fundCategory,
        //     'investmentObjective': fundInfo.investmentObjective,
        //     'benchmark': fundInfo.benchmark,
        //     'managementFee': fundInfo.managementFee,
        //     'fundAuditors': fundInfo.fundAuditors,
        //     'fundStabilityRating': fundInfo.fundStabilityRating,
        //     'authorizedParticipant': fundInfo.authorizedParticipant,
        //     'i-nav': `${overview.navPerUnit.includes('.') ? Number(overview.navPerUnit).toFixed(4) : Number(overview.navPerUnit)}`,
        // };

        // if (offeringDocumentList.length > 0) {
        //     offeringDocumentWrapper.href = `${mahaanaWealthCashFund}/api/Document/${offeringDocumentList[offeringDocumentList.length - 1].key.split('.')[0]}`;

        //     offeringDocumentList.pop();

        //     if (offeringDocumentList.length >= 1) {
        //         reportWrap.style.display = "none";
        //     }
        // }
        
        reportsData = offeringDocumentList;

        displayReports(offeringDocumentList);

        // offeringDocumentList.length > 5 && renderPagination(offeringDocumentList);

        for (const elementId in contentMapping) {
            createText(elementId, contentMapping[elementId])
        }
        
        // data.currentAssetAllocation = transformData(currentAssetAllocation, 'table');
        data.creditRating = transformData(creditRating, 'table');
        data.holding = transformData(holding, 'table');

        addGraph("container2", data.creditRating)
        addGraph("container1", data.holding)
        
        // const assetAllocationData = {
        //     "currentAssetAllocation": currentAssetAllocation,
        //     "lastAssetAllocation": lastAssetAllocation
        // };

        // const assetClasses = Object.keys(assetAllocationData.currentAssetAllocation);
        // const overallAssetAllocationData = assetClasses
        //     .map(assetClass => ({
        //         name: assetClass,
        //         current: assetAllocationData.currentAssetAllocation[assetClass],
        //         last: assetAllocationData.lastAssetAllocation[assetClass]
        //     }))
        //     .filter(data => data.current > 0 || data.last > 0);

        // data.overAllCreditRating = overallAssetAllocationData;

        renderLoop(data, airPerformances);

        // if (Object.keys(holding).length > 0) {
        //     holdingChartWrap.style.display = "none";
        //     holdingList.style.display = "flex";
        //     renderHoldingChart(transformData(holding))
        // } else {
        //     holdingChart.style.border = 0
        // }

        // if (Object.keys(creditRating).length > 0) {
        //     creditChartWrap.style.display = "none";
        //     creditList.style.display = "flex";
        //     renderCreditChart(transformData(creditRating));
        // } else {
        //     creditChart.style.border = 0;
        // }

        // if (Object.keys(currentAssetAllocation).length > 0) {
        //     assetChartWrap.style.display = "none";
        //     assetList.style.display = "flex";
        //     renderAssetChart(transformData(currentAssetAllocation));
        // }


        // if (Object.keys(overallAssetAllocationData).length > 0) {
        //     assetChartWrap.style.display = "none";
        //     renderAssetChart(overallAssetAllocationData);
        // }

    } catch (error) {
        // creditChart.style.border = 0;
        // holdingChart.style.border = 0;
        console.error('fetchData error')
        console.error(error) 
    }
}

function addGraph(id, data) {
    // console.log('Add graph')

    let transformed_data = []
    for (let i in data) {
        // console.log(i)

        transformed_data.push({
            name: data[i].key,
            y: Number(data[i].value)
        })
    }

    console.log('transformed_data')
    console.log(transformed_data)

    Highcharts.chart(id, {
        chart: {
            type: 'pie'
        },
        title: {
            text: ''  // Remove the title
        },
        exporting: {
            enabled: false  // Disable the exporting hamburger icon
        },
        credits: {
            enabled: false  // Disable the Highcharts watermark
        },
        tooltip: {
            pointFormat: '{series.name} <b>{point.y:.2f}%</b>'
        },
        colors: PIE_COLORS_NEW,
        plotOptions: {
            pie: {
                innerSize: '80%',  // Adjust inner radius size (donut hole)
                size: '90%',  // Adjust outer radius size (decrease overall chart size)
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
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f}%'
                }
            }
        },
        series: [{
            name: '',
            data: transformed_data
        }]
    });
}

async function getFundPrices(airBase, productName) {
    let airPerfData = []
    const format_options = { day: '2-digit', month: '2-digit', year: 'numeric'}
    
    await airBase('Adjust_nav_values').select({
        maxRecords: 10000,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
        records.forEach(function (record) {
            const d = new Date(record.fields.date)
            const date_str = d.toLocaleString('en-GB', format_options)
            airPerfData.push({
                "date": date_str,
                "navValue": record.fields.navValue,
                "performanceValue": record.fields.performanceValue,
                "kmi30": record.fields.kmi30,
                "peer_avg": record.fields.peer_avg
            })
        })

        fetchNextPage() 
    })

    // console.log('airPerfData')
    // console.log(airPerfData)

    // Calculate MTD, YTD and etc performances
    let airPerformances = await calcPerf(airBase, productName)

    console.log('airPerfData')
    console.log(airPerfData)
    
    renderFundChart(airPerfData);
    renderPerfChart(airPerfData)

    let totalReturnDate = document.querySelector('#totalReturnsDate');
    const lastDate = airPerfData[airPerfData.length - 1].date;
    if (totalReturnDate) {
        totalReturnDate.textContent = `as of ${moment(lastDate, 'DD/MM/YYYY').format('D MMM YYYY')}`;
    }

    return airPerformances
    
    
    // const params = typeof duration == 'object' || duration == undefined ? 36 : duration;
    // const url = `${mahaanaWealthCashFund}/api/CashFund/fundperformance/miietf?duration=${params}`;
    // fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    //     .then((response) => {
    //         if (!response.ok) {
    //             return response.json().then((errorData) => {
    //                 throw new Error(errorData.message || 'Unknown error occurred.')
    //             });
    //         }
    //         return response.json();
    //     }).then((data) => {
    //         poerformanceWrap.style.display = "none";
    //         let totalReturnDate = document.querySelector('#totalReturnsDate');
    //         console.log(data)
    //         // renderFundChart(data);
    //         const lastDate = data[data.length - 1].date;
    //         if (totalReturnDate) {
    //             totalReturnDate.textContent = `as of ${moment(lastDate, 'DD/MM/YYYY').format('D MMM YYYY')}`;
    //         }
    //     }
    //     ).catch((error) => {
    //         console.error('Error occurred:', error)
    //     })
}

function renderPerfChart(data) {
    let transformed_data = []

    for (let item in data) {
        
    }
    
    Highcharts.chart('perf-chart', {
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Moose and deer hunting in Norway, 2000 - 2024',
            align: 'left'
        },
        subtitle: {
            text: 'Source: <a href="https://www.ssb.no/jord-skog-jakt-og-fiskeri/jakt" target="_blank">SSB</a>',
            align: 'left'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 120,
            y: 70,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
        },
        xAxis: {},
        yAxis: {
            title: {
                text: 'Quantity'
            }
        },
        tooltip: {
            shared: true,
            headerFormat: '<b>Hunting season starting autumn {point.x}</b><br>'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            series: {
                pointStart: 2000
            },
            areaspline: {
                fillOpacity: 0.4,
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
        series: [{
            name: 'Moose',
            data:[
                	[2000, 55000],
                 	[2001, 56000],
                    [2002, 55000],
                 	[2004, 56000],
                    [2005, 55000],
                 	[2006, 56000],
                    [2007, 55000],
                 	[2008, 56000]
                ]
        }]
                /*[   
                    38000,
                    37300,
                    37892,
                    38564,
                    36770,
                    36026,
                    34978,
                    35657,
                    35620,
                    35971,
                    36409,
                    36435,
                    34643,
                    34956,
                    33199,
                    31136,
                    30835,
                    31611,
                    30666,
                    30319,
                    31766,
                    29278,
                    27487,
                    26007
                ] */
        /*}, {
            name: 'Deer',
            data:
                [
                    22534,
                    23599,
                    24533,
                    25195,
                    25896,
                    27635,
                    29173,
                    32646,
                    35686,
                    37709,
                    39143,
                    36829,
                    35031,
                    36202,
                    35140,
                    33718,
                    37773,
                    42556,
                    43820,
                    46445,
                    50048,
                    52804,
                    49317,
                    52490
                ]
        }
        ]*/
    }); 
}

// Calc MTD, YTD, etc
async function calcPerf(airBase, productName) {
    //////////////
    // MTD CALC //
    //////////////
    let latest_record = null
    let day_before_curr_month_record = null
    let earliest_record = null
    let mtd_miietf = null
    let mtd_bench = null
    let mtd_kmi30 = null
    let mtd_peer = null

    latest_record = await airtable_single_record(airBase, "desc", null)
    latest_nav = latest_record.NAV
    latest_date = new Date(latest_record.date)

    // console.log('latest_record')
    // console.log(latest_record)

    d = new Date(latest_record.date)
    month_str = d.toLocaleString('en-GB', {month: '2-digit'})

    filter_cond = `IF({date} < '2024-${month_str}-01', 1, 0)`
    day_before_curr_month_record = await airtable_single_record(airBase, "desc", filter_cond)

    // console.log('latest_record')
    // console.log(latest_record)
    // console.log('day_before_curr_month_record')
    // console.log(day_before_curr_month_record)

    if (day_before_curr_month_record !== null) {
        if(productName === 'MIIETF') {
            mtd_miietf = latest_record.navValue / day_before_curr_month_record.navValue - 1
            mtd_bench = latest_record.performanceValue / day_before_curr_month_record.performanceValue - 1
            mtd_kmi30 = latest_record.kmi30 / day_before_curr_month_record.kmi30 - 1
            mtd_peer = latest_record.peer_avg / day_before_curr_month_record.peer_avg - 1
        }
        if (productName === 'MICF') {
            let day_before_curr_month_date = new Date(day_before_curr_month_record.date)
            let day_diff = (latest_date - day_before_curr_month_date) / (1000 * 60 * 60 * 24)

            mtd_miietf = (latest_record.navValue / day_before_curr_month_record.navValue - 1) / day_diff * 365
            mtd_bench = (latest_record.performanceValue / day_before_curr_month_record.performanceValue - 1) / day_diff * 365
            mtd_peer = (latest_record.peer_avg / day_before_curr_month_record.peer_avg - 1) / day_diff * 365
        }
    } else {
        let earliest_record = await airtable_single_record(airBase, "asc", null)
        
        if(productName === 'MIIETF') {
            mtd_miietf = latest_record.navValue / earliest_record.navValue - 1
            mtd_bench = latest_record.performanceValue / earliest_record.performanceValue - 1
            mtd_kmi30 = latest_record.kmi30 / earliest_record.kmi30 - 1
            mtd_peer = latest_record.peer_avg / earliest_record.peer_avg - 1
        }
        if (productName === 'MICF') {
            let earliest_date = new Date(earliest_record.date)
            let day_diff = (latest_date - earliest_date) / (1000 * 60 * 60 * 24)

            mtd_miietf = (latest_record.navValue / earliest_record.navValue - 1) / day_diff * 365
            mtd_bench = (latest_record.performanceValue / earliest_record.performanceValue - 1) / day_diff * 365
            mtd_peer = (latest_record.peer_avg / earliest_record.peer_avg - 1) / day_diff * 365
        }
    }
    
    // console.log('mtd')
    // console.log(mtd)

    //////////////
    // YTD CALC //
    //////////////
    let day_before_curr_year_record = null
    let ytd_miietf = null
    let ytd_bench = null
    let ytd_kmi30 = null
    let ytd_peer = null
    let curr_FY_start = null
    let curr_FY_end = null
    
    let year = d.getFullYear()
    // console.log('year')
    // console.log(year)

    let assume_FY_start = new Date(year, 6, 1)
    let assume_FY_end = new Date(year+1, 5, 30)
    // console.log(assume_FY_start)
    // console.log(assume_FY_end)
    
    if (d.getTime() < assume_FY_start.getTime()) {
        // console.log('1')
        curr_FY_start = new Date(year-1, 6, 1)
        curr_FY_end = new Date(year, 5, 30)
    }
    else if (d.getTime() <= assume_FY_end.getTime()) {
        // console.log('2')
        curr_FY_start = assume_FY_start
        curr_FY_end = assume_FY_end
    }

    let curr_FY_start_str = format_date(curr_FY_start)
    // console.log(curr_FY_start_str) 
    // console.log('curr_FY_start_str')
    // console.log(curr_FY_start_str)

    day_before_curr_year_record = await airtable_single_record(airBase, "desc", `IF({date} < '${curr_FY_start_str}', 1, 0)`)
    // console.log(day_before_curr_year_record)

    // if (day_before_curr_year_record !== null) {
    //     ytd_miietf = latest_record.navValue / day_before_curr_year_record.navValue - 1
    //     ytd_bench = latest_record.performanceValue / day_before_curr_year_record.performanceValue - 1
    //     ytd_kmi30 = latest_record.kmi30 / day_before_curr_year_record.kmi30 - 1
    //     ytd_peer = latest_record.peer_avg / day_before_curr_year_record.peer_avg - 1
    // } else {
    //     let earliest_record = await airtable_single_record(airBase, "asc", null)
    //     ytd_miietf = latest_record.navValue / earliest_record.navValue - 1
    //     ytd_bench = latest_record.performanceValue / earliest_record.performanceValue - 1
    //     ytd_kmi30 = latest_record.kmi30 / earliest_record.kmi30 - 1
    //     ytd_peer = latest_record.peer_avg / earliest_record.peer_avg - 1
    // }

    if (day_before_curr_year_record !== null) {
        if(productName === 'MIIETF') {
            ytd_miietf = latest_record.navValue / day_before_curr_year_record.navValue - 1
            ytd_bench = latest_record.performanceValue / day_before_curr_year_record.performanceValue - 1
            ytd_kmi30 = latest_record.kmi30 / day_before_curr_year_record.kmi30 - 1
            ytd_peer = latest_record.peer_avg / day_before_curr_year_record.peer_avg - 1
        }
        if (productName === 'MICF') {
            let day_before_curr_year_date = new Date(day_before_curr_year_record.date)
            let day_diff = (latest_date - day_before_curr_year_date) / (1000 * 60 * 60 * 24)

            ytd_miietf = (latest_record.navValue / day_before_curr_year_record.navValue - 1) / day_diff * 365
            ytd_bench = (latest_record.performanceValue / day_before_curr_year_record.performanceValue - 1) / day_diff * 365
            ytd_peer = (latest_record.peer_avg / day_before_curr_year_record.peer_avg - 1) / day_diff * 365
        }
    } else {
        let earliest_record = await airtable_single_record(airBase, "asc", null)
        
        if(productName === 'MIIETF') {
            ytd_miietf = latest_record.navValue / earliest_record.navValue - 1
            ytd_bench = latest_record.performanceValue / earliest_record.performanceValue - 1
            ytd_kmi30 = latest_record.kmi30 / earliest_record.kmi30 - 1
            ytd_peer = latest_record.peer_avg / earliest_record.peer_avg - 1
        }
        if (productName === 'MICF') {
            let earliest_date = new Date(earliest_record.date)
            let day_diff = (latest_date - earliest_date) / (1000 * 60 * 60 * 24)

            ytd_miietf = (latest_record.navValue / earliest_record.navValue - 1) / day_diff * 365
            ytd_bench = (latest_record.performanceValue / earliest_record.performanceValue - 1) / day_diff * 365
            ytd_peer = (latest_record.peer_avg / earliest_record.peer_avg - 1) / day_diff * 365
        }
    }
    
    // console.log('ytd')
    // console.log(ytd)

    //////////////
    // 90D CALC //
    //////////////
    let back_90_days_date = null
    let ninty_days_miietf = null
    let ninty_days_bench = null
    let ninty_days_kmi30 = null
    let ninty_days_peer = null
    let before_90_days_record = null

    back_90_days_date = new Date(latest_record.date)
    back_90_days_date.setDate(d.getDate() - 89)

    // console.log(back_90_days_date)
    // console.log(d)

    let back_90_days_str = format_date(back_90_days_date)

    filter_cond = `IF({date} < '${back_90_days_str}', 1, 0)`
    before_90_days_record = await airtable_single_record(airBase, "desc", filter_cond)

    // console.log('before_90_days_record')
    // console.log(before_90_days_record)

    // if (before_90_days_record !== null) {
    //     ninty_days_miietf = latest_record.navValue / before_90_days_record.navValue - 1  
    //     ninty_days_bench = latest_record.performanceValue / before_90_days_record.performanceValue - 1
    //     ninty_days_kmi30 = latest_record.kmi30 / before_90_days_record.kmi30 - 1  
    //     ninty_days_peer = latest_record.peer_avg / before_90_days_record.peer_avg - 1 
    // } else {
    //     // earliest_record = await airtable_single_record("asc", null)
    //     ninty_days_miietf = null
    //     ninty_days_bench = null
    //     ninty_days_kmi30 = null
    //     ninty_days_peer = null
    // }

    if (before_90_days_record !== null) {
        if (productName === 'MIIETF') {
            ninty_days_miietf = latest_record.navValue / before_90_days_record.navValue - 1  
            ninty_days_bench = latest_record.performanceValue / before_90_days_record.performanceValue - 1
            ninty_days_kmi30 = latest_record.kmi30 / before_90_days_record.kmi30 - 1  
            ninty_days_peer = latest_record.peer_avg / before_90_days_record.peer_avg - 1 
        }
        if (productName === 'MICF') {
            let before_90_days_date = new Date(before_90_days_record.date)
            let day_diff = (latest_date - before_90_days_date) / (1000 * 60 * 60 * 24)

            ninty_days_miietf = (latest_record.navValue / before_90_days_record.navValue - 1) / day_diff * 365
            ninty_days_bench = (latest_record.performanceValue / before_90_days_record.performanceValue - 1) / day_diff * 365
            ninty_days_peer = (latest_record.peer_avg / before_90_days_record.peer_avg - 1) / day_diff * 365
        }
    } else {
        ninty_days_miietf = null
        ninty_days_bench = null
        ninty_days_kmi30 = null
        ninty_days_peer = null
    }
    
    // console.log('ninty_days')
    // console.log(ninty_days)
    
    /////////////
    // 1Y CALC //
    /////////////
    let year_ago_date = null
    let year_perf_miietf = null
    let year_perf_bench = null
    let year_perf_kmi30 = null
    let year_perf_peer = null
    
    year_ago_date = new Date(latest_record.date)
    year_ago_date.setFullYear(year_ago_date.getFullYear() - 1)

    // console.log('year_ago_date')
    // console.log(year_ago_date)
    
    let year_ago_date_str = format_date(year_ago_date)

    filter_cond = `IF({date} < '${year_ago_date_str}', 1, 0)`
    let year_ago_record = await airtable_single_record(airBase, "desc", filter_cond)

    // console.log('year_ago_record')
    // console.log(year_ago_record)

    // if (year_ago_record !== null) {
    //     year_perf_miietf = latest_record.navValue / year_ago_record.navValue - 1  
    //     year_perf_bench = latest_record.performanceValue / year_ago_record.performanceValue - 1
    //     year_perf_kmi30 = latest_record.kmi30 / year_ago_record.kmi30 - 1  
    //     year_perf_peer = latest_record.peer_avg / year_ago_record.peer_avg - 1  
    // } else {
    //     // earliest_record = await airtable_single_record("asc", null)
    //     // year_perf_miietf = latest_record.navValue / earliest_record.navValue - 1
    //     year_perf_miietf = null
    //     year_perf_bench = null
    //     year_perf_kmi30 = null
    //     year_perf_peer = null
    // }

    if (year_ago_record !== null) {
        if (productName === 'MIIETF') {
            year_perf_miietf = latest_record.navValue / year_ago_record.navValue - 1  
            year_perf_bench = latest_record.performanceValue / year_ago_record.performanceValue - 1
            year_perf_kmi30 = latest_record.kmi30 / year_ago_record.kmi30 - 1  
            year_perf_peer = latest_record.peer_avg / year_ago_record.peer_avg - 1  
        }
        if (productName === 'MICF') {
            let year_ago_date = new Date(year_ago_record.date)
            let day_diff = (latest_date - year_ago_date) / (1000 * 60 * 60 * 24)

            year_perf_miietf = (latest_record.navValue / year_ago_date.navValue - 1) / day_diff * 365
            year_perf_bench = (latest_record.performanceValue / year_ago_date.performanceValue - 1) / day_diff * 365
            year_perf_peer = (latest_record.peer_avg / year_ago_date.peer_avg - 1) / day_diff * 365
        }
    } else {
        year_perf_miietf = null
        year_perf_bench = null
        year_perf_kmi30 = null
        year_perf_peer = null
    }
    
    // console.log('year_perf')
    // console.log(year_perf)

    ///////////////
    // INCEPTION //
    ///////////////
    earliest_record = await airtable_single_record(airBase, "asc", null)
    let inception_miietf = null
    let inception_bench = null
    let inception_kmi30 = null
    let inception_peer = null
    
    if (productName === 'MIIETF') {
        inception_miietf = latest_record.navValue / earliest_record.navValue - 1  
        inception_bench = latest_record.performanceValue / earliest_record.performanceValue - 1
        inception_kmi30 = latest_record.kmi30 / earliest_record.kmi30 - 1  
        inception_peer = latest_record.peer_avg / earliest_record.peer_avg - 1  
    }
    else {
        let earliest_date = new Date(earliest_record.date)
        let day_diff = (latest_date - earliest_date) / (1000 * 60 * 60 * 24)

        inception_miietf = (latest_record.navValue / earliest_record.navValue - 1) / day_diff * 365
        inception_bench = (latest_record.performanceValue / earliest_record.performanceValue - 1) / day_diff * 365
        inception_peer = (latest_record.peer_avg / earliest_record.peer_avg - 1) / day_diff * 365
    }
    
    ///////////////////
    // Return Values //
    ///////////////////
    let mtd_miietf_str = `${(mtd_miietf * 100).toFixed(2)}%`
    let ytd_miietf_str = `${(ytd_miietf * 100).toFixed(2)}%`
    let ninty_days_miietf_str = (ninty_days_miietf) ? `${(ninty_days_miietf * 100).toFixed(2)}%` : '-'
    let year_perf_miietf_str = (year_perf_miietf) ? `${(year_perf_miietf * 100).toFixed(2)}%` : '-'
    let inception_miietf_str = `${(inception_miietf * 100).toFixed(2)}%`

    let mtd_bench_str = `${(mtd_bench * 100).toFixed(2)}%`
    let ytd_bench_str = `${(ytd_bench * 100).toFixed(2)}%`
    let ninty_days_bench_str = (ninty_days_bench) ? `${(ninty_days_bench * 100).toFixed(2)}%` : '-'
    let year_perf_bench_str = (year_perf_bench) ? `${(year_perf_bench * 100).toFixed(2)}%` : '-'
    let inception_bench_str = `${(inception_bench * 100).toFixed(2)}%`

    let mtd_kmi30_str = `${(mtd_kmi30 * 100).toFixed(2)}%`
    let ytd_kmi30_str = `${(ytd_kmi30 * 100).toFixed(2)}%`
    let ninty_days_kmi30_str = (ninty_days_kmi30) ? `${(ninty_days_kmi30 * 100).toFixed(2)}%` : '-'
    let year_perf_kmi30_str = (year_perf_kmi30) ? `${(year_perf_kmi30 * 100).toFixed(2)}%` : '-'
    let inception_kmi30_str = `${(inception_kmi30 * 100).toFixed(2)}%`

    let mtd_peer_str = `${(mtd_peer * 100).toFixed(2)}%`
    let ytd_peer_str = `${(ytd_peer * 100).toFixed(2)}%`
    let ninty_days_peer_str = (ninty_days_peer) ? `${(ninty_days_peer * 100).toFixed(2)}%` : '-'
    let year_perf_peer_str = (year_perf_peer) ? `${(year_perf_peer * 100).toFixed(2)}%` : '-'
    let inception_peer_str = `${(inception_peer * 100).toFixed(2)}%`
    
    let miietfReturn = {
        "name": "MIIETF return",
        "lastUpdatedOn": null,
        "mtd": mtd_miietf_str,
        "ytd": ytd_miietf_str,
        "days30": null,
        "days90": ninty_days_miietf_str,
        "days365": year_perf_miietf_str,
        "years3": null,
        "years5": null,
        "inception": inception_miietf_str
    }

    let benchmarkReturn = {
        "name": "Benchmark return",
        "lastUpdatedOn": null,
        "mtd": mtd_bench_str,
        "ytd": ytd_bench_str,
        "days30": null,
        "days90": ninty_days_bench_str,
        "days365": year_perf_bench_str,
        "years3": null,
        "years5": null,
        "inception": inception_bench_str
    }

    let kmi30Return = {
        "name": "KMI30 return",
        "lastUpdatedOn": null,
        "mtd": mtd_kmi30_str,
        "ytd": ytd_kmi30_str,
        "days30": null,
        "days90": ninty_days_kmi30_str,
        "days365": year_perf_kmi30_str,
        "years3": null,
        "years5": null,
        "inception": inception_kmi30_str
    }

    let peerAvgReturn = {
        "name": "Peer avg. return",
        "lastUpdatedOn": null,
        "mtd": mtd_peer_str,
        "ytd": ytd_peer_str,
        "days30": null,
        "days90": ninty_days_peer_str,
        "days365": year_perf_peer_str,
        "years3": null,
        "years5": null,
        "inception": inception_peer_str
    }

    let airPerformances = [miietfReturn, benchmarkReturn, kmi30Return, peerAvgReturn]

    console.log('airPerformances')
    console.log(airPerformances)
    
    return airPerformances
}

// convert date to this format: 2024-11-01 
function format_date(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`; // Output: "2024-07-24"
    return formattedDate
}

async function airtable_single_record(airBase, sort, filter) {
    let result = null
    let select_options = null 

    if (filter === null) {
        select_options = {
            maxRecords: 1,
            view: "Grid view",
            sort: [{field: "date", direction: sort}]
        }
    } 
    else {
        select_options = {
            maxRecords: 1,
            view: "Grid view",
            filterByFormula: filter,
            sort: [{field: "date", direction: sort}]
        }
    }
    
    await airBase('Adjust_nav_values').select(select_options).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
        records.forEach(function (record) {
            result = record.fields
        })
        fetchNextPage()
    })

    return result
}

function day_between_dates(dateLater, dateEarlier) {
    return (dateLater.getTime() - dateEarlier.getTime()) / (1000 * 3600 * 24)
}

async function main() {
    loader = createLoader();
    loader.style.display = 'flex';

    let airtable = new Airtable({apiKey: 'patnDPQnOez6XuH3I.acbafbff38cb2659ad2a74247aa50db04dc276aaccda314aedf7df118f6bf3e2'})
    let miietfBase = airtable.base('app9fpjsdlh5R7gsq')
    let micfBase = airtable.base('app3KpgeOesdEHazM')

    let productName = document.querySelector('#product_name').innerText
    console.log(productName)

    if (productName === 'MIIETF') {
        let airPerformances = await getFundPrices(miietfBase, productName)
        await getFundData(miietfBase, airPerformances, productName)
    } 
    else if (productName === 'MICF') {
        let airPerformances = await getFundPrices(micfBase, productName)
        // getFundDataMIIETF(airPerformances)
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
 
