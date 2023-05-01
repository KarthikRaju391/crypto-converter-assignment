import { MagnifyingGlass } from "@phosphor-icons/react";
import tick from "../assets/tick.svg";
import React from "react";

interface Props {
	tokens: any[];
	token: string;
	setSearchItem: React.Dispatch<React.SetStateAction<string>>;
	handleSelect: (name: string, symbol: string, icon: string) => void;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal = ({
	tokens,
	token: selectedToken,
	setSearchItem,
	handleSelect,
	setIsModalOpen,
}: Props) => {
	return (
		<div className="absolute modal-container inset-0 w-full min-h-screen bg-[#0B0819] grid place-items-center z-50">
			<div className="w-[25rem] h-[29rem] rounded-xl bg-gradient-to-b mt-[16rem] from-[rgb(40,75,131)] to-[#000000] px-[0.85px] py-[0.85px]">
				<div className="bg-[#181627] rounded-xl h-full w-full">
					<div className="flex justify-between items-center p-2">
						<button
							className="bg-[#252046] rounded-md p-1 ml-auto focus:outline-none"
							onClick={() => setIsModalOpen(false)}
						>
							<svg
								className="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
					</div>
					<div className="px-12 overflow-y-auto max-h-[calc(100%-4rem)]">
						<div>
							<div className="flex border border-[#2e265b] px-3 py-2 rounded-full mb-4">
								<MagnifyingGlass size={30} />
								<input
									type="search"
									name="searchbox"
									id="searchbox"
									placeholder="Search chains"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setSearchItem(e.target.value)
									}
									className="bg-transparent w-11/12 outline-none pl-3 placeholder:text-[#d2d2d2] text-[#d2d2d2]"
								/>
							</div>
							<ul className="space-y-4">
								{tokens.map((token) => (
									<li
										key={token.symbol}
										onClick={() => {
											handleSelect(token.name, token.symbol, token.iconUrl);
											// setSelectedToken(token.symbol);
											setIsModalOpen(false);
										}}
										className="bg-[#1b192d] rounded-md px-3 py-2 cursor-pointer"
									>
										<div className="flex gap-3 items-center">
											<img
												src={token.iconUrl}
												alt={`${token.symbol} logo`}
												width={30}
												className="object-cover"
											/>
											<p>{token.name}</p>
											{token.symbol === selectedToken && (
												<img
													className="ml-auto"
													src={tick}
													alt="tick"
													width={20}
												/>
											)}
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchModal;
