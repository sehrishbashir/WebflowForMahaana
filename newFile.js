const { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } = Recharts;

function Welcome() {
    return (<div class="calculatorWrapper">
        <ResponsiveContainer><h1>Hello React!</h1></ResponsiveContainer>
    </div>);
}

ReactDOM.render(<Welcome />, document.getElementById("b2c-header"));