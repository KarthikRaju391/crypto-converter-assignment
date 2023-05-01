import { useState, useEffect } from "react";
import rupee from '../assets/rupee.svg'

interface Props {
	token: string;
	setUsdPrice: React.Dispatch<React.SetStateAction<number>>;
}

const CurrentValue = ({ token, setUsdPrice }: Props) => {
	const [priceInInr, setPriceInInr] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		setIsLoading(true);

		const client = new WebSocket(
			`wss://stream.binance.com:9443/ws/${token.toLowerCase() + "usdt"}@ticker`
		);

		client.onopen = () => {
			console.log("WebSocket Client Connected");
		};

		client.onmessage = async (message: MessageEvent) => {
			setIsLoading(false);
			const data = JSON.parse(message.data);
			const price = parseFloat(data.c);
			setUsdPrice(price);
			const inrPrice = (price * 80).toFixed(2);
			setPriceInInr(parseFloat(inrPrice));
		};

		return () => {
			client.close();
		};
	}, [token, setUsdPrice]);

	return (
		<div className="flex justify-between items-center">
			<p className="text-sm text-[#C5C5C5]">Current value</p>
			<p className="flex gap-2 items-center text-[#627EEA] font-semibold text-2xl">
				<img src={rupee} alt="rupee symbol"/> {isLoading ? "Loading..." : priceInInr}
			</p>
		</div>
	);
};

export default CurrentValue;
