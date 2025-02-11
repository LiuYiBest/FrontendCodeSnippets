document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todoInput');
    const submitBtn = document.querySelector('.submit-btn');
    const todoList = document.querySelector('.todo-list');

    // 添加新任务
    submitBtn.addEventListener('click', function() {
        const todoText = todoInput.value.trim();
        if (todoText) {
            addTodoItem(todoText);
            todoInput.value = '';
        }
    });

    // 创建新的任务项
    function addTodoItem(text) {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
            <input type="checkbox">
            <span>${text}</span>
            <button class="delete-btn">×</button>
        `;

        // 删除按钮功能
        todoItem.querySelector('.delete-btn').addEventListener('click', function() {
            todoItem.remove();
        });

        todoList.appendChild(todoItem);
    }

    // 回车提交
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
}); 