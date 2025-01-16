"use client"

import {
    Button,
    Input,
    List,
    ListItem,
    ListItemSuffix,
    Card,
    IconButton
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, changeComplete, reorderTodos } from "@/redux/todoSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function TrashIcon() {
    return (
        <svg className="w-6 h-6 text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
        </svg>
    );
}
function SlashIcon() {
    return (
        <svg className="w-6 h-6 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 6.2V5h12v1.2M7 19h6m.2-14-1.677 6.523M9.6 19l1.029-4M5 5l6.523 6.523M19 19l-7.477-7.477"/>
        </svg>
    );
}

function OrderListIcon(){
    return (
        <svg className="w-6 h-6 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
        </svg>
    )
}

export default function Home() {
    const todos = useSelector(state => state.todos) // Untuk menampilkan list todos di store
    const dispatch = useDispatch() // ambil untuk action nya (addTodo, deleteTodo)

    function addTask(e){
        e.preventDefault()

        if(e.target.activity.value.length < 1){
            alert("Input is empty")
            return
        }
        // Panggil action addTodo dari file todoSlice
        dispatch(addTodo(e.target.activity.value))

        e.target.activity.value = ''
    }

    function handleChangeComplete(id){
        // Panggil action changeComplete dari file todoSlice
        dispatch(changeComplete(id))
    }

    function handleDeleteTodo(id){
        // Panggil action deleteTodo dari file todoSlice
        dispatch(deleteTodo(id))
    }

    function handleDragEnd(result) {
        if (!result.destination) return;
        const { destination, source } = result
        // Panggil action reorderTodos dari file todoSlice
        // Logika untuk mengubah urutan todo
        dispatch(reorderTodos({
            sourceIndex: source.index,
            destinationIndex: destination.index
        }))
    }

    return (
        <>
            <main className="bg-gray-200 w-full h-screen p-5">
                <div className="max-w-3xl mx-auto px-4 py-10 bg-white rounded-md">
                    <form onSubmit={addTask} autoComplete="off">
                        <Input name="activity" label="Write youre activity...." />
                        <Button className="block ms-auto mt-4" type="submit">Add Activity</Button>
                    </form>
                    {
                        // Jika todos ada, maka tampilkan
                        todos.length > 0
                        ?
                        <Card className="w-full mt-3">
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="todos"
                                    isDropDisabled={false}
                                    direction="vertical"
                                    isCombineEnabled={false}
                                    ignoreContainerClipping={false}
                                >
                                    {(provided) => (
                                        <List
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {
                                                todos.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                        {(provided) => (
                                                            <ListItem
                                                                ripple={false}
                                                                className={`py-1 pr-1 pl-4 ${item.complete ? 'line-through font-bold text-red-400 hover:text-red-500' : ''}`}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                            >
                                                                <p className="line-clamp-1">{item.activity}</p>
                                                                <ListItemSuffix className="flex items-center">
                                                                    <OrderListIcon />
                                                                    <IconButton onClick={() => handleChangeComplete(item.id)} variant="text" color="blue-gray">
                                                                            <SlashIcon />
                                                                    </IconButton>
                                                                    <IconButton onClick={() => handleDeleteTodo(item.id)} variant="text" color="blue-gray">
                                                                        <TrashIcon />
                                                                    </IconButton>
                                                                </ListItemSuffix>
                                                            </ListItem>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}
                                        </List>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Card>
                        :
                        <h1 className="text-center font-semibold tracking-wide mt-4">Activity is empty</h1>
                    }
                </div>
            </main>
        </>
    )
}
