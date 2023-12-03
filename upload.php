<?php
    $folderPath = "upload/";
    if(empty($_POST['gambarmu'])){
        echo "Kosong";
    }else{
    $image_parts = explode(";base64,", $_POST['gambarmu']); 
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];
    $image_base64 = base64_decode($image_parts[1]);
    $file = $folderPath . uniqid() . '.'.$image_type;
    file_put_contents($file, $image_base64);
    ?>
    Gambar Sudah Tersimpan di Server ---<br/>
    <a href="upload">Buka Folder Tersimpan</a>
    <?php }
?>