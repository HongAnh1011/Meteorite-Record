import React, {useEffect, useRef} from "react";
import './style.css';

export default function DataTable({
		items, 
		renderHead, 
		renderRow,
		loadMore,
}) {
	const ref = useRef(null);

	useEffect(() => {
		document.getElementById("dataTable").addEventListener('scroll', handleScroll);
		return () => document.getElementById("dataTable").removeEventListener('scroll', handleScroll);
	}, []);

	function handleScroll(e) {
		const table = document.getElementById("dataTable")
		const cY = table.scrollTop;
		const clientHeight = table.clientHeight;
		const scrollBarHeight = table.offsetHeight - clientHeight;
		/*const thresh = 1000;*/
		console.log(cY, clientHeight, scrollBarHeight)
		/*if (clientHeight -cY - scrollBarHeight < 100) loadMore();*/
		if (clientHeight -cY < 1000) loadMore();
	}

	return (
		<div id="dataTable" className="tableContainer">
			<table className='__dml_table' cellSpacing={0} cellPadding={0}>
				<thead>
					<tr>{renderHead()}</tr>
				</thead>
			
				<tbody  ref={ref}>{items.map((row) => renderRow(row))}</tbody>
			</table>
		</div>
	);
}