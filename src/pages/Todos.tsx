import { useState, useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { Todo } from '@/types/todo';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { CheckSquare, Square, Trash2, Edit2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/Button';
import TodosAddModal from "@/containers/TodosPageComponents/TodosAddModal";
import TodosUpdateModal from "@/containers/TodosPageComponents/TodosUpdateModal";
import TodosDeleteModal from "@/containers/TodosPageComponents/TodosDeleteModal";
import TodosExpandedModal from "@/containers/TodosPageComponents/TodosExpandedModal";

type TodoWithDetails = Todo & {
  note?: string;
  date?: string;
  time?: string;
};  

export default function Todos() {
  const { t, i18n } = useTranslation();               
  const [todos, setTodos] = useLocalStorage<TodoWithDetails[]>('todos', []);
  const [text, setText] = useState('');

  const [expandedTodo, setExpandedTodo] = useState<TodoWithDetails | null>(null);
  const [updateTodo, setUpdateTodo] = useState<TodoWithDetails | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState<string | null>(null);

  const [note, setNote] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [updateNote, setUpdateNote] = useState('');
  const [updateDate, setUpdateDate] = useState('');
  const [updateTime, setUpdateTime] = useState('');

  const isRTL = i18n.language === 'fa';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [i18n.language, isRTL]);

  const slideDirection = isRTL ? { x: 200, opacity: 0 } : { x: -200, opacity: 0 };

  const openAddModal = () => {
    if (!text.trim()) return;
    setNote('');
    setDate('');
    setTime('');
    setAddModalOpen(true);
  };

  const saveNewTodo = () => {
    const newTodo: TodoWithDetails = { id: uuidv4(), text, done: false, note, date, time };
    setTodos([...todos, newTodo]);
    setText('');
    setAddModalOpen(false);
  };

  const saveMaybeLater = () => {
    const newTodo: TodoWithDetails = { id: uuidv4(), text, done: false };
    setTodos([...todos, newTodo]);
    setText('');
    setAddModalOpen(false);
  };

  const openUpdate = (todo: TodoWithDetails) => {
    setUpdateTodo(todo);
    setUpdateNote(todo.note || '');
    setUpdateDate(todo.date || '');
    setUpdateTime(todo.time || '');
  };

  const saveUpdate = () => {
    if (!updateTodo) return;
    const updatedTodo: TodoWithDetails = {
      ...updateTodo,
      note: updateNote,
      date: updateDate,
      time: updateTime,
    };
    setTodos(todos.map(t => (t.id === updatedTodo.id ? updatedTodo : t)));
    setUpdateTodo(null);
  };

  const closeUpdate = () => setUpdateTodo(null);

  const confirmDelete = (id: string) => setDeleteTodoId(id);

  const deleteConfirmed = () => {
    if (!deleteTodoId) return;
    setTodos(todos.filter(todo => todo.id !== deleteTodoId));
    setDeleteTodoId(null);
  };

  const cancelDelete = () => setDeleteTodoId(null);

  const toggleDone = (id: string) =>
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );

  return (
    <div className="p-8 flex flex-col gap-4">
      <form
        className="flex gap-2 mb-4 max-sm:scale-[0.90]"
        onSubmit={(e) => {
          e.preventDefault();
          openAddModal();
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('todos.inputTitle')}
          className="border p-2 flex-1 dark:bg-gray-800 dark:text-white rounded"
        />
        <Button
          variant="primary"
          type="submit"
          className={`transition ${!text.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!text.trim()}
        >
          {t('todos.add')}
        </Button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-sm:scale-[0.90]">
        {todos.map(todo => (
          <motion.div
            key={todo.id}
            layoutId={todo.id}
            className="border rounded-lg p-4 bg-white dark:bg-gray-700 shadow relative flex flex-col cursor-pointer"
            whileHover={{ scale: 1.03 }}
            onClick={() => setExpandedTodo(todo)}
          >
            <div className="flex justify-between items-center mb-2">
              <div className={`font-bold text-lg dark:text-white ${todo.done ? 'line-through text-gray-400' : ''}`}>
                {todo.text}
              </div>

              <div className="flex gap-2">
                <div onClick={e => { e.stopPropagation(); toggleDone(todo.id); }}>
                  {todo.done ? <CheckSquare className="text-green-500" /> : <Square />}
                </div>

                <div onClick={e => { e.stopPropagation(); openUpdate(todo); }}>
                  <Edit2 className="text-blue-500 hover:text-blue-600" />
                </div>

                <div onClick={e => { e.stopPropagation(); confirmDelete(todo.id); }}>
                  <Trash2 className="text-red-500 hover:text-red-600" />
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              {todo.date} {todo.time && `| ${todo.time}`}
            </div>

            <div className="text-gray-800 dark:text-gray-200">
              {todo.note?.slice(0, 50)}{todo.note && todo.note.length > 50 ? "..." : ""}
            </div>
          </motion.div>
        ))}
      </div>
      {expandedTodo && (
          <TodosExpandedModal
            todo={expandedTodo}
            isRTL={isRTL}
            onClose={() => setExpandedTodo(null)}
        />
      )}
      {addModalOpen && (
          <TodosAddModal
              text={text}
              note={note}
              date={date}
              time={time}
              setNote={setNote}
              setDate={setDate}
              setTime={setTime}
              onSave={saveNewTodo}
              onMaybeLater={saveMaybeLater}
              onClose={() => setAddModalOpen(false)}
              slideDirection={slideDirection}
          />
        )}


      {updateTodo && (
          <TodosUpdateModal
              todo={updateTodo}
              note={updateNote}
              date={updateDate}
              time={updateTime}
              setNote={setUpdateNote}
              setDate={setUpdateDate}
              setTime={setUpdateTime}
              onSave={saveUpdate}
              onClose={closeUpdate}
              slideDirection={slideDirection}
            />
        )}


        {deleteTodoId && (
            <TodosDeleteModal
              onCancel={cancelDelete}
              onDelete={deleteConfirmed}
              slideDirection={slideDirection}
            />
        )}
    </div>
  );
}
