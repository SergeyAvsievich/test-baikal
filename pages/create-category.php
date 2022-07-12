<?php require_once $_SERVER['DOCUMENT_ROOT'] . '/header.php';?>
    <main>
        <div class="container">
            <form class="form mx-auto mt-5">
                <div class="mb-3">
                    <label for="inputName" class="form-label">Название категории</label>
                    <input type="text" class="form-control" id="inputName" name="newcategory" required>
                </div>
                <div class="mb-3">
                <label for="select-categoty" class="form-label">Выбирите родительскую категорию</label>
                    <select id="select-categoty" class="form-select" name="select-category">
                        <option value="0" data-option="0">нет категории</option>
                    </select>
                </div>
                <button class="btn btn-success submit-btn">Создать категорию</button>
            </form>
            <div class="result">

            </div>
        </div> 
    </main>
    <script type="module" src="../js/db.js"></script>
    <script type="module" src="../js/category.js"></script>
</body>
</html>