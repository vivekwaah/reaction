import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { AgGridReact } from 'ag-grid-react';
import { formatDate } from '../../../utilities/Timer';
import SingleTodo from './SingleTodo';
import { Bars2Icon, TableCellsIcon } from '@heroicons/react/24/outline';

const TodoList: React.FC = () => {
	const todos = useSelector((state: RootState) => state.todoList.todos);
	const [displayGrid, setDisplayGrid] = useState(true);

	const toggleDisplay = () => {
		setDisplayGrid(!displayGrid);
	};

	const DateColumnRender = (props: any) => {
		return formatDate(props.data.id);
	};

	const colDefs = [
		{ field: 'todo', flex: 2, filter: true, },
		{
			field: 'Date',
			cellRenderer: DateColumnRender,
			flex: 1,
			comparator: (valueA: number, valueB: number) => {
				const dateA = new Date(valueA);
				const dateB = new Date(valueB);

				if (dateA.getTime() === dateB.getTime()) {
					return 0;
				}
				return dateA.getTime() > dateB.getTime() ? 1 : -1;
			},
			sortable: true
		},
	];


	const renderGrid = () => {
		return displayGrid ? (
			<div className='todos grid grid-cols-4 gap-4 px-4'>
				{todos.map((todo) => (
					<SingleTodo todo={todo} key={todo.id.toString()} />
				))}
			</div>
		) : (
			<div className='ag-theme-quartz px-4 mt-4' style={{ height: 500 }}>
				<AgGridReact rowData={todos} columnDefs={colDefs} />
			</div>
		);
	};

	return (
		<div className="w-full mx-auto">
			<div className="flex justify-end my-4">
				{displayGrid ? (
					<Bars2Icon onClick={toggleDisplay} className="h-5 w-5 text-gray-100 cursor-pointer" aria-hidden="true" />
				) : (
					<TableCellsIcon onClick={toggleDisplay} className="h-5 w-5 text-gray-100 cursor-pointer" aria-hidden="true" />
				)}
			</div>
			{renderGrid()}
		</div>
	);
};

export default TodoList;
