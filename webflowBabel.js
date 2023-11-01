const graphEquatiesOptions = [{ id: 1, title: 'Treasury Bills', category: 'Low Risk', rate: '0.094', type: 'bill', isShown: false }, { id: 2, title: 'Gold', category: 'Moderate', rate: '0.100', type: 'gold', isShown: false }, { id: 3, title: 'Dollars', category: 'Moderate', rate: '0.070', type: 'dollar', isShown: false }, { id: 4, title: 'Equity', category: 'High Risk', rate: '0.168', type: 'equity', isShown: false }];
const graphColorCodes = ['#00338D', '#D1B000', '#85BB65', '#43BED8'];

const { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } = Recharts;
const { debounce } = MaterialUI;

const ContributionChart = ({ amount, amount2 }) => {

    const [initRange, setInitRange] = React.useState(1000);
    const [monthlyRange, setMonthlyRange] = React.useState(500);
    const [selectedRate, setSelectedRate] = React.useState(graphEquatiesOptions)
    const [selectedOpt, setSelectedOpt] = React.useState([])
    const [graphData, setGraphData] = React.useState()
    const [maxFutureValue, setMaxFutureValue] = React.useState(100000);
    const [startingValue, setStartingValue] = React.useState(1000);
    const [retirementAge, setRetirementAge] = React.useState(10);

    React.useEffect(() => { if (amount) { setInitRange(Number(amount)) }; if (amount2) { setMonthlyRange(Number(amount2)) } }, [amount, amount2])
    React.useEffect(() => { handleDebouce(initRange); }, [initRange, monthlyRange, selectedRate]);
    React.useEffect(() => { setSelectedOpt([]); initialSetValues(); handleDebouce(initRange); }, []);

    const initialSetValues = () => { setInitRange(Number(initRange)); setMonthlyRange(Number(monthlyRange)); const array = [...selectedRate]; array[0]['isShown'] = true; setSelectedRate(array); const selectedItemsArr = []; selectedItemsArr.push(array[0]); setSelectedOpt(selectedItemsArr); }

    const onSelectRate = (item) => {
        if (item) {
            const selectedItem = selectedRate.find(rateItem => rateItem.title.toLowerCase() === item);
            if (selectedItem) {
                const updatedSelectedOpt = [...selectedOpt]; const index = updatedSelectedOpt.indexOf(selectedItem); const array = [...selectedRate]; const selectedItem2 = array.find((element) => element.id === selectedItem.id);
                if (selectedOpt.length == 1) { selectedItem2['isShown'] = true } else { selectedItem['isShown'] = !selectedItem2.isShown }
                setSelectedRate(array);
                if (index === -1) { updatedSelectedOpt.push(selectedItem); } else { if (updatedSelectedOpt.length > 1) { updatedSelectedOpt.splice(index, 1); } }
                setSelectedOpt(updatedSelectedOpt);
            }
        }
        else {
            const array = [...selectedRate]; const selectedItem = array.find((element) => element.id === item.id);
            if (selectedOpt.length == 1) { selectedItem['isShown'] = true } else { selectedItem['isShown'] = !selectedItem.isShown }
            setSelectedRate(array)
        }
    }
    window.onSelectRate = onSelectRate;

    const handleDebouce = (initRange) => {
        const initialRange = initRange || 0;
        if (monthlyRange > -1) { const expectedChangeAmount = monthlyRange; debouncedDrawGraph(expectedChangeAmount, retirementAge, initialRange); }
    }

    const debouncedDrawGraph = React.useCallback(debounce((expectedAmount, retirementAge, initRange) => HandleFormulae(expectedAmount, retirementAge, initRange), 1000), [monthlyRange, initRange]);

    const calculateNumberOfPayments = (retirementAge) => { let numberOfPayments; numberOfPayments = retirementAge * 12; if (numberOfPayments < 0) { numberOfPayments = 0; } return numberOfPayments; };

    const HandleFormulae = (expectedAmount, retirementAge, initRange) => { let monthlySelectedSavingValue; monthlySelectedSavingValue = expectedAmount; const numberOfPayments = calculateNumberOfPayments(retirementAge); const total = setGraphDataFunc(numberOfPayments, monthlySelectedSavingValue, initRange); const totalMax = Math.ceil(Number(total.plus(total.times(new Big(Math.random() * 0.1).plus(Math.random() * 0.15))).div(1000).round().times(1000).toString())); setMaxFutureValue(totalMax); }

    const setGraphDataFunc = (numberOfPayments, monthlySavingValue, initRange) => {
        const data = []; let months = numberOfPayments;
        if (months < 0) { months = 0; }

        let startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

        if (startDate.getMonth() > 0) { startDate = new Date(startDate.getFullYear() + 1, 0, 1); }

        let bill = monthlySavingReturns('bill', initRange)
        let dollar = monthlySavingReturns('dollar', initRange)
        let gold = monthlySavingReturns('gold', initRange)
        let equity = monthlySavingReturns('equity', initRange)

        data.push({ bill: Number(bill), dollar: Number(dollar), gold: Number(gold), equity: Number(equity), },);

        for (let i = 0; i < months; i++) {
            bill = monthlySavingReturns('bill', bill, monthlySavingValue);
            dollar = monthlySavingReturns('dollar', dollar, monthlySavingValue);
            gold = monthlySavingReturns('gold', gold, monthlySavingValue);
            equity = monthlySavingReturns('equity', equity, monthlySavingValue);

            if (startDate.getMonth() == 10) {
                data.push({
                    year: `${startDate.getFullYear()}`,
                    bill: Number(bill), dollar: Number(dollar),
                    gold: Number(gold), equity: Number(equity),
                });
            }
            startDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
        }

        setGraphData(data); const maxVal = getMaxVal(data[data.length - 1]);
        return maxVal;
    }

    const getMaxVal = (obj) => { const maxVal = Big(Math.max(...Object.keys(obj).filter(key => key !== 'year').map(key => obj[key]))); return maxVal; }

    const monthlySavingReturns = (key, value, monthlySaving) => {
        let returnRate;
        graphEquatiesOptions.find((item) => {
            if (item.type == key) {
                if (item.isShown) {
                    if (monthlySaving) {
                        returnRate = new Big(item.rate).div(12).plus(1).times(value.plus(monthlySaving));
                    } else {
                        let converted = new Big(value);
                        returnRate = converted.plus((converted.times(item.rate).div(12)))
                    }
                }
                else { returnRate = 0 }
            }
        })
        return returnRate;
    }

    const defaultCurrency = 'PKR'; const defaultLocale = 'en-US';
    const currencyFormatOptions = { style: 'currency', currency: defaultCurrency, signDisplay: 'never', currencyDisplay: 'code', maximumFractionDigits: 0, };
    const CurrencyFormatter = (amount, showPrefix = false, showSign = 'auto', hideDecimal = false) => { if (typeof amount !== 'number') { return Number(amount).toLocaleString(defaultLocale, currencyFormatOptions); } const options = { ...currencyFormatOptions }; options.style = showPrefix ? 'currency' : 'decimal'; options.signDisplay = showSign === 'always' || showSign === 'exceptZero' ? 'never' : showSign; options.maximumFractionDigits = hideDecimal ? 0 : 2; return amount.toLocaleString(defaultLocale, options); };

    const CustomTooltip = ({ active, payload }) => { if (active && payload && payload.length) { payload.sort((a, b) => b.value - a.value); return (<div><p style={{ fontFamily: 'Poppins', fontSize: '14px', color: '#677385', marginBottom: 0, lineHeight: '24px', textAlign: 'right', paddingTop: 0 }}>{payload[0].payload.year}</p>{payload.map((item, index) => { const name = item.dataKey == 'bill' ? "Treasury Bill" : item.dataKey; const color = item.fill; return (<p key={String(index)} style={{ fontFamily: 'Poppins', fontSize: '13px', marginBottom: 0, lineHeight: '24px', fontWeight: 500, textAlign: 'right', textTransform: 'capitalize', paddingTop: 0, color: color }}>{`${name}: ${CurrencyFormatter(item.value)}`}</p>) })} </div>); } return null; };

    const kFormatter = (num) => { let formattedNumber; num = Math.abs(num); if (num >= 1000000000) { formattedNumber = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'; } else if (num >= 1000000) { formattedNumber = (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; } else if (num >= 100000) { formattedNumber = num.toLocaleString(); } else { formattedNumber = num; } return formattedNumber; }

    return (<div class="calculatorWrapper">
        <ResponsiveContainer width="100%" height={461}>
            <LineChart width={730} height={100} data={graphData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}><CartesianGrid strokeDasharray="0 0" vertical={false} /><XAxis dataKey="year" axisLine={false} /><YAxis interval={0} minTickGap={0} tickCount={8} orientation="left" axisLine={false} includeHidden tickFormatter={kFormatter} />
                <Tooltip
                    content={<CustomTooltip />}
                    wrapperStyle={{ backgroundColor: '#fff', borderRadius: '4px', padding: '10px' }}
                />
                {selectedRate.map((item, index) => {
                    return (item.isShown && <Line key={String(index)} type="monotone" dataKey={item.type} stroke={graphColorCodes[index]} strokeWidth={2} fillOpacity={1} fill={graphColorCodes[index]} isAnimationActive dot={false} />)
                })}
            </LineChart>
        </ResponsiveContainer>
    </div>)
}
ReactDOM.render(<ContributionChart />, document.getElementById('contribution-chart'));
const mahaanaChart = (amount, amount2) => ReactDOM.render(<ContributionChart amount={amount} amount2={amount2} />, document.getElementById('contribution-chart'));
window.mahaanaChart = mahaanaChart;