// const PIE_COLORS = ['#583EB1', '#43BED8', '#9575FF', '#4382D8', '#85EBFF', '#5D9631'];
// const { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Sector, Cell, Legend, AreaChart, Area } = Recharts;
// const { Pagination } = MaterialUI;
// const defaultCurrency = "PKR"; const defaultLocale = "en-PK";
// const currencyFormatOptions = { maximumFractionDigits: 2, style: 'decimal', currency: defaultCurrency, signDisplay: "never", currencyDisplay: 'code' }
// const currencyFormatter = (amount) => { return Number(amount).toLocaleString(defaultLocale, currencyFormatOptions); }
// const PerformanceChart = ({ data }) => {
//     const dataMinPer = 0.99; const dataMaxPer = 1.01;
//     const [xInterval, setXInterval] = React.useState(window.innerWidth < 550 ? 4 : 8);
//     const [graphHeight, setGraphHeight] = React.useState(window.innerHeight < 900 ? 350 : 450);
//     const debouncedResize = () => {
//         setXInterval(window.innerWidth < 550 ? 4 : 8);
//         setGraphHeight(window.innerHeight < 900 ? 300 : 400);
//     };
//     React.useEffect(() => {
//         window.addEventListener("resize", debouncedResize);
//         return () => { window.removeEventListener("resize", debouncedResize) };
//     }, []);
//     const CustomizedXAxisTick = (props) => {
//         const { payload, x, y, index } = props;
//         return (<g transform={`translate(${x},${y})`}><text x={0} y={0} dy={18} textAnchor="middle" fill="#666">{payload.value && moment(payload.value, "DDMMYYYY").format('MMM DD')}</text></g>)
//     };
//     const CustomTooltip = ({ active, payload }) => {
//         if (active && payload && payload.length) {
//             const data = payload[0].payload; const color1 = payload[0].color; const color2 = payload[1].color;
//             return (<div className="recharts-default-tooltip"><p className="recharts-tooltip-label">{moment(data.date, 'DD/MM/YYYY').format("MMM DD, YYYY")}</p><p style={{ color: color1 }} className="recharts-tooltip-item">{'MICF: ' + currencyFormatter(data.navValue)}</p><p style={{ color: color2 }} className="recharts-tooltip-item">{'Benchmark: ' + currencyFormatter(data.performanceValue)}</p></div>)
//         }
//         return null
//     };

//     return (
//         <ResponsiveContainer width="100%" height={graphHeight}>
//             <AreaChart width={500} height={graphHeight} data={data} margin={{ top: 24, right: 24, left: -10, bottom: 24 }}>
//                 <CartesianGrid strokeDasharray="0 0" stroke="#ccc" horizontal={false} />
//                 <XAxis tickLine={false} dataKey="date" interval={Math.ceil(data.length / xInterval)} allowDuplicatedCategory={false} axisLine={false} tick={<CustomizedXAxisTick />} tickCount={8} />
//                 <YAxis
//                     allowDataOverflow={true} allowDecimals={false} axisLine={false} tickLine={false}
//                     domain={[(dataMin) => dataMin > 0 && isFinite(dataMin) ? new Big(dataMin).times(dataMinPer).round() : 0, (dataMax) => dataMax > 0 && isFinite(dataMax) ? new Big(dataMax).times(dataMaxPer).round() : 0]}
//                     interval={'preserveStartEnd'} type={'number'} tickCount={10} tickFormatter={(value, index) => value.toLocaleString()} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <defs><linearGradient id='colorUv' x1='0' x2='0' y1='0' y2='1'><stop offset='10%' stopColor='#A249DD' stopOpacity={0.3} /><stop offset='90%' stopColor='#A249DD' stopOpacity={0} /></linearGradient></defs>
//                 <Area activeDot={{ r: 7, strokeWidth: 2, stroke: '#FFF' }} strokeWidth={2.5} type="monotone" dataKey="navValue" stroke="#43BED8" fill="transparent" name='MICF' dot={false} />
//                 <Area activeDot={{ r: 7, strokeWidth: 2, stroke: '#FFF' }} strokeWidth={2.5} type="monotone" dataKey="performanceValue" stroke="#A249DD" fill='url(#colorUv)' fillOpacity={1} name='Benchmark' dot={false} />
//             </AreaChart></ResponsiveContainer>)
// }
// const renderFundChart = (data) => ReactDOM.render(<PerformanceChart data={data} />, document.getElementById('performance-area-chart'));
// window.renderFundChart = renderFundChart;
// const PieCustomChart = ({ data }) => {
//     const [activeIndex, setActiveIndex] = React.useState(-1);
//     const onPieEnter = React.useCallback((_, index) => { setActiveIndex(index); }, [setActiveIndex]);
//     const onPieLeave = React.useCallback((_, index) => { setActiveIndex(-1); }, [setActiveIndex]);
//     const renderActiveShape = (props) => {
//         const { cx, cy, endAngle, fill, innerRadius, outerRadius, startAngle, } = props;
//         return (<g><Sector cx={cx} cy={cy} endAngle={endAngle} fill={fill} innerRadius={innerRadius - 2} outerRadius={outerRadius + 2} startAngle={startAngle} stroke={'26.5667px solid #3D2B7D'} style={{ filter: 'drop-shadow(rgb(152,152,152) 1.32084px 10.9813px 3.6229px)', cursor: 'pointer' }} /></g>);
//     };
//     const renderHorizontalCusomizedLegend = (props) => {
//         const { payload } = props
//         return (<ul class='legends-list'>{payload.map((entry, index) => { return (<li key={`item-${index}`}><div style={{ backgroundColor: entry.color, height: '8px', width: '8px' }} /><span class='pie-legend'>{entry.payload.key}</span></li>) })}</ul>)
//     }
//     return (
//         <div style={{ width: "100%", height: "100%", position: 'relative', top: '-12px', margin: '0 auto' }}>
//             <ResponsiveContainer className={'creditQualityPie'} width="100%" height={400}>
//                 <PieChart><Legend content={renderHorizontalCusomizedLegend} layout='horizontal' />
//                     <Pie activeIndex={activeIndex} activeShape={renderActiveShape} onMouseEnter={onPieEnter} onMouseLeave={onPieLeave} data={data} cx="50%" cy="50%" labelLine={false} outerRadius={"75%"} innerRadius={"47%"} startAngle={90} endAngle={-360} paddingAngle={1} fill="#8884d8" dataKey="value" stroke={'26.5667px solid #3D2B7D'}>
//                         {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />))}
//                     </Pie></PieChart></ResponsiveContainer></div>)
// }

// const renderAssetChart = (data) => ReactDOM.render(<PieCustomChart data={data} />, document.getElementById('asset-allocation-chart'));
// const renderCreditChart = (data) => ReactDOM.render(<PieCustomChart data={data} />, document.getElementById('credit-quality-chart'));
// window.renderAssetChart = renderAssetChart; window.renderCreditChart = renderCreditChart;

// const renderPagination = (data) => {
//     const totalPages = Math.ceil((data.length || 0) / 5);
//     ReactDOM.render(<Pagination count={totalPages} page={window.currentPage} onChange={(event, page) => goToPage(page)} siblingCount={0} boundaryCount={2} />, document.getElementById('pagination'))
// };
// window.renderPagination = renderPagination;