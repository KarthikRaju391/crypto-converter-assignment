import { useState, useEffect } from "react";
import rupee from "../assets/rupee.svg";
import { CircleNotch, XCircle } from "@phosphor-icons/react";

interface Props {
	token: string;
	setUsdPrice: React.Dispatch<React.SetStateAction<number>>;
}

interface State {
	priceInInr: number | null;
	isLoading: boolean;
	isError: boolean;
}

const CurrentValue = ({ token, setUsdPrice }: Props) => {
	const [state, setState] = useState<State>({
		priceInInr: null,
		isLoading: true,
		isError: false,
	});

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			isLoading: true,
			isError: false,
		}));

		const client = new WebSocket(
			`wss://stream.binance.com:9443/ws/${token.toLowerCase() + "usdt"}@ticker`
		);

		client.onopen = () => {
			console.log("WebSocket Client Connected");
		};

		client.onmessage = async (message: MessageEvent) => {
			const data = JSON.parse(message.data);
			const price = parseFloat(data.c);
			setUsdPrice(price);
			const inrPrice = (price * 80).toFixed(2);
			setState((prevState) => ({
				...prevState,
				priceInInr: parseFloat(inrPrice),
				isLoading: false,
			}));
		};

		client.onerror = (error: Event) => {
			if (error) {
				setState((prevState) => ({
					...prevState,
					isLoading: false,
					isError: true,
				}));
			}
		};

		return () => {
			client.close();
		};
	}, [token, setUsdPrice]);

	return (
		<div className="flex justify-between items-center">
			<p className="text-sm text-[#C5C5C5]">Current value</p>
			<p className="flex gap-2 items-center text-[#627EEA] font-semibold text-2xl">
				{!state.isLoading && state.isError && (
					<XCircle size={30} className="text-[#FF4D4D]" />
				)}
				{state.isLoading ? (
					<CircleNotch size={30} className="animate-spin" />
				) : (
					<>
						<img src={rupee} alt="rupee symbol" /> {state.priceInInr}
					</>
				)}
			</p>
		</div>
	);
};

export default CurrentValue;
