// waits for the initial html document to be loaded
document.addEventListener('DOMContentLoaded', async () => {
    const table = document.getElementById('crypto-table');

    // to format the prices in the USD format
    const format = (value) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const fetchPrices = async () => {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d');
        const coin = await response.json();

        table.innerHTML = '';

        coin.forEach((data) => {
            // representation for rows
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${data.market_cap_rank}</td>
                <p>
                    <div class="data">
                        <img src="${data.image}" alt="${data.symbol}">
                        <div>
                            <h4>${data.name}</h4>
                            <small>${data.symbol}</small>
                        </div>
                    </div>
                </p>
                <td>${format(data.current_price)}</td>
                <td>${data.price_change_percentage_1h_in_currency.toFixed(2)}</td>
                <td>${data.price_change_percentage_24h_in_currency.toFixed(2)}</td>
                <td>${data.price_change_percentage_7d_in_currency.toFixed(2)}</td>
                <td>${format(data.total_volume)}</td>
                <td>${format(data.market_cap)}</td>
            `;

        table.appendChild(row);
        });
    };

    fetchPrices();
    setInterval(fetchPrices, 5000);
});
