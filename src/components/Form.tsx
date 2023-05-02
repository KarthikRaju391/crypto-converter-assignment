import React, { useState } from "react";
import SearchDropdown from "./SearchDropdown";
import CurrentValue from "./CurrentValue";

export interface Token {
	name: string;
	symbol: string;
	icon: string;
}

const Form: React.FC = () => {
	const [token, setToken] = useState<Token>({
		name: "Ethereum",
		symbol: "ETH",
		icon: "https://cdn.coinranking.com/rk4RKHOuW/eth.svg",
	});
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
		const usdRate = parseFloat(e.target.value) / 80;
		setCryptoReturns((usdRate / usdPrice).toString());
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<div className="relative min-h-screen mt-9 w-11/12 md:w-3/5 lg:w-[470px] top-20 mx-auto">
			<div className="flex justify-center">
				<div className="absolute top-[-30px] rounded-full bg-[#1c1731] border-2 border-[#46425E] z-50">
					<img
						src={token.icon}
						alt={`${token.symbol} logo`}
						width={70}
						className="object-cover p-4"
					/>
				</div>
			</div>
			<div className="bg-gradient-to-b relative from-[#46425E] to-[#000000] p-[1px] rounded-xl">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col px-9 py-10 pt-20 space-y-6 bg-[#0B0819] rounded-xl h-full"
				>
					<CurrentValue token={token.symbol} setUsdPrice={setUsdPrice} />
					<SearchDropdown
						token={token}
						setToken={setToken}
						setAmountInvested={setAmountInvested}
						setCryptoReturns={setCryptoReturns}
					/>
					<div className="flex flex-col gap-3">
						<label htmlFor="amount-invested" className="text-sm text-[#DCDCEC]">
							Amount you want to invest
						</label>
						<div className="w-full flex justify-between items-center border py-2 border-[#241b51] rounded-lg">
							<input
								type="number"
								name="amount-invested"
								id="amount-invested"
								onChange={handleChange}
								value={amountInvested}
								placeholder="0.00"
								className="outline-none px-6 w-10/12 placeholder:font-semibold placeholder:text-[22px] placeholder:text-[#6f6f7e] font-semibold text-[22px] py-2 bg-transparent rounded-lg"
							/>
							<span className="mx-auto">INR</span>
						</div>
					</div>
					<div className="flex flex-col gap-3">
						<label htmlFor="crypto-returns" className="text-sm text-[#DCDCEC]">
							Estimate number of {token.symbol} you'll get
						</label>
						<input
							type="string"
							name="crypto-returns"
							id="crypto-returns"
							value={cryptoReturns}
							placeholder="0.00"
							disabled
							className="bg-[#1c1731] outline-none px-6 placeholder:font-semibold placeholder:text-[22px] placeholder:text-[#6f6f7e] font-semibold text-[22px] py-4 rounded-lg"
						/>
					</div>
					<div className="mt-5">
						<input
							type="submit"
							name="buy"
							value="Buy"
							id="buy"
							className="cursor-pointer font-bold bg-gradient-to-r from-[#3387D5] to-[#7A06C9]
							rounded-full py-3 mt-6 w-full"
						/>
					</div>
				</form>
			</div>
		</div>
		// 	<div className="max-w-md border">
		// 	</div>
	);
};

export default Form;
