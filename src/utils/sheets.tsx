export const handleRemoveSheet = (
  removedSheets,
  setRemovedSheets,
  selectedSheets,
  setSelectedSheets,
  setIsModifiable,
) => {
  setRemovedSheets(removedSheets.concat(selectedSheets))
  setSelectedSheets([])
  setIsModifiable(false)

  // TODO: POST sheets to remove
}
