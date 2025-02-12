document.addEventListener('DOMContentLoaded', function() {
    let currentDate = new Date();
    let selectedDate = null;

    const daysContainer = document.querySelector('.days');
    const currentMonthElement = document.querySelector('.current-date h2');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const todayBtn = document.getElementById('todayBtn');
    const themeToggle = document.getElementById('themeToggle');

    function renderCalendar(date) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0);
        const firstDayIndex = (firstDay.getDay() + 6) % 7; // 调整为周一开始
        const lastDayIndex = (lastDay.getDay() + 6) % 7;
        const nextDays = 7 - lastDayIndex - 1;

        currentMonthElement.textContent = `${date.getFullYear()}年${date.getMonth() + 1}月`;

        let days = '';

        // 上个月的日期
        for (let x = firstDayIndex; x > 0; x--) {
            days += `<div class="day other-month">${prevLastDay.getDate() - x + 1}</div>`;
        }

        // 当前月的日期
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const isToday = i === new Date().getDate() && 
                           date.getMonth() === new Date().getMonth() &&
                           date.getFullYear() === new Date().getFullYear();
            const isSelected = selectedDate && i === selectedDate.getDate() && 
                             date.getMonth() === selectedDate.getMonth() &&
                             date.getFullYear() === selectedDate.getFullYear();
            
            days += `<div class="day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}">${i}</div>`;
        }

        // 下个月的日期
        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="day other-month">${j}</div>`;
        }

        daysContainer.innerHTML = days;

        // 添加日期点击事件
        document.querySelectorAll('.day:not(.other-month)').forEach(day => {
            day.addEventListener('click', () => {
                selectedDate = new Date(date.getFullYear(), date.getMonth(), parseInt(day.textContent));
                renderCalendar(currentDate);
            });
        });
    }

    // 初始化日历
    renderCalendar(currentDate);

    // 上个月按钮
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    // 下个月按钮
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // 今天按钮
    todayBtn.addEventListener('click', () => {
        currentDate = new Date();
        selectedDate = currentDate;
        renderCalendar(currentDate);
    });

    // 主题切换
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // 添加键盘导航
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
                currentDate.setMonth(currentDate.getMonth() - 1);
                break;
            case 'ArrowRight':
                currentDate.setMonth(currentDate.getMonth() + 1);
                break;
            case 'Home':
                currentDate = new Date();
                selectedDate = currentDate;
                break;
            default:
                return;
        }
        renderCalendar(currentDate);
    });
}); 