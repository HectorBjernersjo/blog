"use client";
// components/TabComponent.tsx
import { FC, useState } from 'react';
import './FileComponent.style.css';

interface TabComponentProps {
	icon: string;
	page: string;
	text: string;
	isSelected: boolean;
	onShowPage?: (page: string) => void;
}

const TabComponent: FC<TabComponentProps> = ({ icon, page, text, isSelected, onShowPage }) => {
	const handleTabClick = () => {
		if (onShowPage) {
			onShowPage(page);
		}
	};


	return (
		<button className={`file ${isSelected ? 'selected' : ''}`} onClick={handleTabClick}>
			<img src={icon} height="20" width="20" />
			<p>{text}</p>
		</button>
	)
};

export default TabComponent;
