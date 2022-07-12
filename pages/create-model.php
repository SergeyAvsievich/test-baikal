<?php require_once $_SERVER['DOCUMENT_ROOT'] . '/header.php';?>
    <main>
        <div class="container">
            <form class="mx-auto mt-5" action="../db/reducer.php" method="POST" enctype="multipart/form-data">  
                <div class="mb-3">
                    <label for="inputName" class="form-label">Название модели</label>
                    <input type="text" class="form-control" id="inputName" name="name" required>
                </div>
                <div class="mb-3">
                    <label for="select-categoty" class="form-label">Выбирите категорию</label>
                    <select id="select-categoty" class="form-select" name="category">
                    </select>
                </div>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Загрузите изображение</label>
                    <input class="form-control" type="file" id="formFile" name="img">
                </div>
                <input type="hidden" name="newModel" value="newModel">
                <button type="submit" class="btn btn-success">Добавить модель</button>
            </form>
        </div>
        <script type="module" src="../js/db.js"></script>
        <script type="module" src="../js/model.js"></script>
    </main>
</body>
</html>