import { Box, Chip, TextField } from '@mui/material';
import { useState } from 'react';

type Props = {
  tags: string[];
  updateTags: (newTags: string[]) => void;
};

const TagsField = ({ tags, updateTags }: Props) => {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    const newTagValue = newTag.trim().toLocaleLowerCase();
    setNewTag('');

    if (tags.includes(newTagValue)) {
      return;
    }

    updateTags([...tags, newTagValue]);
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = tags.filter(t => t !== tag);
    updateTags(updatedTags);
  };

  return (
    <>
      <TextField
        label="Etiquetas"
        fullWidth
        sx={{ mb: 1 }}
        helperText="Presiona [SPACE] para agregar"
        value={newTag}
        onChange={({ target }) => setNewTag(target.value)}
        onKeyUp={({ code }) => (code === 'Space' ? handleAddTag() : undefined)}
      />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 0,
          m: 0,
        }}
        component="ul"
      >
        {tags.map(tag => {
          return (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              color="primary"
              size="small"
              sx={{ ml: 1, mt: 1 }}
            />
          );
        })}
      </Box>
    </>
  );
};

export default TagsField;
