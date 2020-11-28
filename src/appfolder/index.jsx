import React, {useState, useEffect} from "react";
import DataTable from "../ui/datatable";
import Tr from './tr';
import {sortTable} from '../sortTable';
import TextField from '../ui/text-field';
import json from '../data/meteorites.json';
import {Line, Bar} from 'react-chartjs-2';
import './style.css';

function pageData({data, per = 10, page = 1}) {
	return data.slice(per * (page - 1), per * page);
}

const searchableColumns = ['name', 'year',];
const test = json.filter((json) => json.year > 1900,);

export default function App({}) {
	const [state, setState] = useState({
		data: pageData({ data: test }),
		loading: false,
		page: 1,
		sortedBy: {name: 'ascending'},
	});

	const [query, setQuery] = useState('');

	useEffect(() => {
		if (!state.sortedBy) return;

    const sortKey = Object.keys(state.sortedBy)[0];
    const direction = state.sortedBy[sortKey];

	  setState((prev) => ({
			...prev,
			/*data: prev.data.sort((a, b) => {
    			const reverse = direction ? 1 : -1;
          		if (a[sortKey] < b[sortKey]) return -1 * reverse;
				if (a[sortKey] > b[sortKey]) return 1 * reverse;
			}),*/
      data: sortTable(prev.data, sortKey, direction)
		}));
	}, [state.sortedBy]);

	useEffect(() => {
      setState((prev) => ({
        ...prev,
        data: search(test),
      }));
    }, [query]);

    function search(data) {
      return data.filter((row) =>
        searchableColumns.some(
          (column) =>
            row[column]
              .toString()
              .toLowerCase()
              .indexOf(query) > -1,
        ),
      );
    }

	function loadMore() {
		if (state.loading) return;
		setState((prev) => ({
			...prev,
			loading: true,
		}));

		setState((prev) => ({
			data: [
				...prev.data,
				...pageData({ data: test, page: prev.page + 1 }),
			],
			loading: false,
			page: prev.page + 1,
		}));
	}


  const dataSorted = test.sort((a,b) => a.year - b.year);

  const datass = json.map(function(e) {return e.mass;});
  const lineData = {
    labels: dataSorted.map(e => e.year),
    datasets: [{
      label: 'mass (g)',
      data:datass,
      backgroundColor: ['#808080'],
    }]
  };

  const lineOption = {
    plugins: {
      datalabels: {
        color: 'rgba(255, 99, 132, 0.2)',
        align: 'start',
        anchor: 'end'
      }
    },
    responsive: true,
    scales: {
      xAxes: [{
        display: true,
        stacked: true,
        ticks: {fontColor: 'white'}
      }],
      yAxes: [{
        beginAtZero: true,
        ticks: {
          min: 0,
          max: 4000000,
          stepSize: 500000,
          fontColor: 'white'
        },
        stacked: true,
      }],
      legend: {
        labels: {fontColor:'white'}
      },
      maintainAspectRatio: false
    }
  }
	return (<>
    <div className='chartCont'>
    <Line
      data={lineData}
      options={lineOption} 
    /></div>
		<TextField
        	placeholder='Type name or year here (e.g: Chervettaz or 1901)'
        	value={query}
        	onChange={(val) => setQuery(val)}
      	/>

		<DataTable
			loadMore={loadMore}
			items={state.data}
			renderHead={() => (
				<>
					<Tr
          				label='name'
            			sortedBy={state.sortedBy}
           				sort={{ key: 'name', changer: setState }}
        			/>
        			<Tr
           				label='id'
           				sortedBy={state.sortedBy}
          				sort={{ key: 'id', changer: setState }}
        			/>
        			<Tr
           				label='nametype'
           				sortedBy={state.sortedBy}
           				sort={{ key: 'nametype', changer: setState }}
        			/>
        			<Tr
       				    label='recclass'
       				    sortedBy={state.sortedBy}
       				    sort={{ key: 'recclass', changer: setState }}
        			/>
        			<Tr
      				    label='mass'
       				    sortedBy={state.sortedBy}
       				    sort={{ key: 'mass', changer: setState }}
        			/>
        			<Tr
       				    label='fall'
       				    sortedBy={state.sortedBy}
        				sort={{ key: 'fall', changer: setState }}
        			/>
        			<Tr
      				    label='year'
      				    sortedBy={state.sortedBy}
      				    sort={{ key: 'year', changer: setState }}
        			/>
        			<Tr
       				   	label='reclat'
        				sortedBy={state.sortedBy}
        				sort={{ key: 'reclat', changer: setState }}
        			/>
        			<Tr
       				  	label='reclong'
        				sortedBy={state.sortedBy}
        				sort={{ key: 'reclong', changer: setState }}
        			/>
				</>
			)}

			renderRow={(row, ind) => (
				<tr key={ind}>
					<td>{row.name}</td>
					<td>{row.id}</td>
					<td>{row.nametype}</td>
					<td>{row.recclass}</td>
					<td>{row.mass}</td>
					<td>{row.fall}</td>
					<td>{row.year}</td>
					<td>{row.reclat}</td>
					<td>{row.reclong}</td>
				</tr>
			)}
		/>
	</>);
}