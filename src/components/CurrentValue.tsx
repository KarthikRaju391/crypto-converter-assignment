import { useState, useEffect } from "react";

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
		<div>
			<p>Current Value</p>
			<p>₹ {isLoading ? "Loading..." : priceInInr}</p>
		</div>
	);
};

export default CurrentValue;
