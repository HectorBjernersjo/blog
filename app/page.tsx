"use client";
import Image from "next/image";
import "./globals.css";
import TabComponent from './TabComponent';
import FileComponent from './FileComponent';
import FilesIcon from "./files.svg";
import FiverrIcon from "./fiverr.svg";
import VolleyballIcon from "./volleyball.svg";
import GithubIcon from "./github.svg";
import WebsiteIcon from "./website.svg";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
	const [selectedTab, setSelectedTab] = useState<string | null>("ai-product-researcher");
	const [projects, setProjects] = useState([
		{
			'page': 'ai-product-researcher',
			'text': 'ai product researcher.cs',
			'icon': 'icons/csharp.svg',
			'isVisible': false,
		},
		{
			'page': 'llm-rag-chat',
			'text': 'llm rag chat.jsx',
			'icon': 'icons/react.svg',
			'isVisible': false,
		},
		{
			'page': 'ai-volleyball-tracker',
			'text': 'ai volleyball tracker.py',
			'icon': 'icons/python.svg',
			'isVisible': false,
		},
	]);
	const [markdownContent, setMarkdownContent] = useState<string>("");

	const showAllTabs = async () => {
		setProjects((prevProjects) => {
			return prevProjects.map(project => ({ ...project, isVisible: true }));
		});
		showPage(selectedTab);
	}

	const closeAllTabs = async () => {
		setProjects((prevProjects) => {
			return prevProjects.map(project => ({ ...project, isVisible: false }));
		});
		showPage("");
	}

	const showPage = async (page: string | null) => {
		if (page == undefined || page == null) {
			return;
		}
		console.log("showing page:", page)
		setSelectedTab(page);
		try {
			const response = await fetch(`/projects/${page}.md`);
			if (response.status === 404) {
				setMarkdownContent("# Not found");
			}
			else {
				const markdown = await response.text();
				setMarkdownContent(markdown);
			}
		} catch (e) {
			console.log("Error when getting markdown", e)
			setMarkdownContent("Error when fetching page");
		}
		setProjects((prevProjects) =>
			prevProjects.map((project) =>
				project.page === page
					? { ...project, isVisible: true }
					: project
			)
		);
	}
	// useEffect(() => { showPage("ai-product-researcher") }, []);

	const xClick = (page: string) => {
		console.log("closing page:", page);
		setProjects((prevProjects) => {
			const updatedProjects = prevProjects.map((project) =>
				project.page === page
					? { ...project, isVisible: false }
					: project
			);
			const visiblePages = updatedProjects.filter(project => project.isVisible).map(p => p.page);
			console.log(visiblePages);
			showPage(visiblePages[0]);
			return updatedProjects
		});
	}

	return (
		<>
			<div className="top-bar">

			</div>
			<div className="big">
				<div className="left-bar">
					<ul>
						{/*
						<li>
							<a href="">
								<FilesIcon width={25} height={25} fill="#707070" />
							</a>
						</li>
										*/}
						<li>
							<a href="https://github.com/HectorBjernersjo" target="_blank">
								<GithubIcon width={28} height={28} />
							</a>
						</li>
						<li>
							<a href="https://firefrogstudio.se" target="_blank">
								<WebsiteIcon width={26} height={26} fill="#707070" />
							</a>
						</li>
						<li>
							<a href="https://fiverr.com/hectorwp" target="_blank">
								<FiverrIcon width={30} height={30} />
							</a>
						</li>
					</ul>
				</div>
				<div className="file-bar">
					<div className="top">
						<img width="20" height="20" src="/icons/Arrow-down.svg" />
						<h2>BLOG</h2>
					</div>
					{projects.map((project, index) => {
						return (
							<FileComponent key={index} page={project.page} text={project.text} icon={project.icon} isSelected={selectedTab === project.page} onShowPage={showPage} />
						)
					})}
					<div className="home-file" >
						<FileComponent page={""} text={"Home.md"} icon={"icons/markdown.svg"} isSelected={!projects.some(p => p.isVisible)} onShowPage={closeAllTabs} />
					</div>
				</div>
				<div className="big-2">
					{projects.some(project => project.isVisible) &&
						<div className="almost-top-bar">
							<div className="tabs-bar">
								{projects.map((project, index) => {
									return (
										<TabComponent key={index} page={project.page} text={project.text} icon={project.icon} isSelected={selectedTab === project.page} isVisible={project.isVisible} onShowPage={showPage} onXClick={xClick} />
									)
								})}
							</div>
							<button id="close-all-button" className="x" onClick={closeAllTabs}>
								<img src="/icons/x.svg" height="14" width="14" alt="close tab" />
							</button>
						</div>
					}
					<div className="main">
						{projects.some(project => project.isVisible) ?
							<div className="content-wrapper">
								<div className="content">
									<ReactMarkdown>{markdownContent}</ReactMarkdown>
								</div>
							</div> :
							<div className="start-page">
								<h1>FULL STACK<br /> DEVELOPER</h1>
								<h2>HECTOR BJERNERSJÖ</h2>
								<VolleyballIcon className="volleyball" height="1000" width="1000" />
								<div className="container">
									<div className="first-two">
										<a href="https://github.com/HectorBjernersjo" target="_blank">Github</a>
										<a href="https://firefrogstudio.se" target="_blank">Web bureau</a>
									</div>
									<div className="second-two">
										<a href="https://fiverr.com/hectorwp" target="_blank">Fiverr</a>
										<a onClick={showAllTabs}>Projects</a>
									</div>
								</div>
							</div>
						}
					</div>
				</div>
			</div>
		</>
	);
}
