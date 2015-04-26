<!-- TEMPORARY VIEW FOR TESTING THE DEFECT CONTROLLER --->
<?php echo validation_errors(); ?>
<form action="http://fixphase.com/defect/create/<?php echo $project_id; ?>" method="POST">
     TITLE<input type="text" name="title">
     PLATFORM<input type="text" name="platform">
     VERSION<input type="text" name="version">
     DESCRIPTION<textarea name="description"></textarea>
     SEVERITY<select name="severity">
          <option>Cosmetic</option>
          <option>Minor</option>
          <option>Moderate</option>
          <option>Major</option>
     </select>
     PRIORITY<select name="priority">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
     </select>
     <input type="hidden" name="product" value="<?php echo $project_id; ?>">
     <input type="submit">
</form>
