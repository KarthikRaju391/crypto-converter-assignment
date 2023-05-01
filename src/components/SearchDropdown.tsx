import React, { useState, useEffect } from "react";
import axios from "axios";
import CaretDown from "../assets/caret-down.svg";
import { Token } from "./Form";
import SearchModal from "./SearchModal";

interface Props {
	token: Token;
	setToken: React.Dispatch<React.SetStateAction<Token>>;
	setAmountInvested: React.Dispatch<React.SetStateAction<string>>;
	setCryptoReturns: React.Dispatch<React.SetStateAction<string>>;
}

const SearchDropdown = ({
	token,
	setToken,
	setAmountInvested,
	setCryptoReturns,
}: Props) => {
	const [searchItem, setSearchItem] = useState<string>("");
	const [topTokens, setTopTokens] = useState<any[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
	}, [apiKey, token]);

	const handleSelect = (name: string, symbol: string, icon: string) => {
		setToken({ name, symbol, icon });
		setSearchItem("");
		setAmountInvested("");
		setCryptoReturns("");
	};

	return (
		<div>
			{isModalOpen ? (
				<SearchModal
					tokens={
						searchItem
							? topTokens.filter((token) => token.name.toLowerCase().includes(searchItem.toLowerCase()))
							: topTokens
					}
					token={token.symbol}
					setSearchItem={setSearchItem}
					handleSelect={handleSelect}
					setIsModalOpen={setIsModalOpen}
				/>
			) : null}
			<div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
				<div className="flex justify-start gap-3 items-center bg-[#1C1731] p-4 rounded-lg">
					<img src={token.icon} alt={`${token.symbol} logo`} width={32} />
					<p className="text-base">{token.name}</p>
					<img className="ml-auto" src={CaretDown} alt="arrow-down" />
				</div>
			</div>
		</div>
	);
};

export default SearchDropdown;
