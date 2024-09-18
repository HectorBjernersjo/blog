"use client";
import Image from "next/image";
// components/TabComponent.tsx
import { FC } from 'react';
import './TabComponent.style.css';

interface TabComponentProps {
	icon: string;
	page: string;
	text: string;
	isSelected: boolean;
	isVisible: boolean;
	onShowPage?: (page: string) => void;
	onXClick?: (page: string) => void;
}

const TabComponent: FC<TabComponentProps> = ({ icon, page, text, isSelected, isVisible, onShowPage, onXClick }) => {
	const handleTabClick = () => {
		if (onShowPage) {
			onShowPage(page);
		}
	};

	const handleXClick = (event: React.MouseEvent) => {
		if (onXClick) {
			onXClick(page);
		}
		event.stopPropagation(); // Prevent tab click event
	};

	return (
		isVisible && (
			<div className={`tab-container ${isSelected ? 'selected' : ''}`} onClick={handleTabClick}>
				<button className="tab">
					<Image className="icon" src={icon} height="20" width="20" alt="" />
					<p>{text}</p>
				</button>
				{isSelected && (
					<button id="x-button" className="x" onClick={handleXClick}>
						<Image src="/icons/x.svg" height="10" width="10" alt="close tab" />
					</button>
				)}
				<style jsx>{`
          }
        `}</style>
			</div>
		)
	);
};

export default TabComponent;
