import React, { useState } from "react";
import SearchDropdown from "./SearchDropdown";
import CurrentValue from "./CurrentValue";

const Form: React.FC = () => {
	const [token, setToken] = useState<string>("ETH");
	const [amountInvested, setAmountInvested] = useState<string>("");
	const [cryptoReturns, setCryptoReturns] = useState<string>("");
	const [usdPrice, setUsdPrice] = useState<number>(0);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			setCryptoReturns("");
			setAmountInvested("");
			return;
		}
		setAmountInvested(e.target.value);
		const usdRate = parseFloat(amountInvested) / 80;
		setCryptoReturns((usdRate / usdPrice).toString());
	};

	return (
		<div>
			<form>
				<CurrentValue token={token} setUsdPrice={setUsdPrice} />
				<SearchDropdown
					token={token}
					setToken={setToken}
					setAmountInvested={setAmountInvested}
					setCryptoReturns={setCryptoReturns}
				/>
				<label htmlFor="amount-invested">Amount you want to invest</label>
				<input
					type="number"
					name="amount-invested"
					id="amount-invested"
					onChange={handleChange}
					value={amountInvested}
				/>
				<label htmlFor="crypto-returns">
					Estimate number of {token} you'll get
				</label>
				<input
					type="number"
					name="crypto-returns"
					id="crypto-returns"
					value={cryptoReturns}
					disabled
				/>
			</form>
		</div>
	);
};

export default Form;
