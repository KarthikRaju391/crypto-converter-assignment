import React, { useState, useEffect } from "react";
import axios from "axios";

interface Props {
	token: string;
	setToken: React.Dispatch<React.SetStateAction<string>>;
	setAmountInvested: React.Dispatch<React.SetStateAction<string>>;
	setCryptoReturns: React.Dispatch<React.SetStateAction<string>>;
}

const SearchDropdown = ({
	token,
	setToken,
	setAmountInvested,
	setCryptoReturns,
}: Props) => {
	// const [searchItem, setSearchItem] = useState<string>("");
	const [topTokens, setTopTokens] = useState<any[]>([]);

	const apiKey = import.meta.env.VITE_API_KEY;
	useEffect(() => {
		const fetchTopTokens = async () => {
			try {
				const response = await axios.get(
					"https://api.coinranking.com/v2/coins",
					{
						headers: {
							"x-access-token": apiKey,
						},
					}
				);
				const tokens = await response.data.data.coins;
				const filteredTokens = tokens.filter(
					(token: any) => !token.symbol.includes("USD")
				);
				const sortedTokens = filteredTokens.sort(
					(a: any, b: any) =>
						parseFloat(b["24hVolume"]) - parseFloat(a["24hVolume"])
				);
				const top25Tokens = sortedTokens.slice(0, 25);

				setTopTokens(top25Tokens);
			} catch (error) {
				console.error("Error fetching top tokens", error);
			}
		};

		fetchTopTokens();
	}, [apiKey]);

	const handleSelect = (symbol: string) => {
		setToken(symbol);
		setAmountInvested("");
		setCryptoReturns("");
	};

	return (
		<div>
			<h1>{token}</h1>
			<ul>
				{topTokens.map((token: any) => (
					<li key={token.symbol} onClick={() => handleSelect(token.symbol)}>
						<img src={token.iconUrl} alt={`${token.symbol} logo`} width={30} />
						{token.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default SearchDropdown;
