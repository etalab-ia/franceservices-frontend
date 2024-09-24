import React, { useMemo, useState } from 'react'
import { useGetInstitutions } from '@api'
import { Input } from '@codegouvfr/react-dsfr/Input'
import Fuse from 'fuse.js'

const options = {
  includeScore: true,
  includeMatches: true,
  threshold: 0.2,
  keys: ['name'],
}

export function ThemesAndAdminsInput({
  field,
  onTagSelect,
  themes,
  administrations,
  showError,
}) {
  const [searchResults, setSearchResults] = useState([])
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const { data: institutions, error: institutionsError } = useGetInstitutions()

  const fuse = useMemo(() => {
    if (institutions) {
      return new Fuse(institutions, options)
    }
    return null
  }, [institutions])

  const handleSearch = (e) => {
    const value = e.target.value
    setSelectedValue(value)
    setSelectedIndex(-1)
    if (fuse) {
      setSearchResults(value ? fuse.search(value).map((result) => result.item) : [])
    }
  }

  const handleKeyDown = (e) => {
    if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault()
      const newIndex =
        e.key === 'ArrowDown'
          ? Math.min(selectedIndex + 1, searchResults.length - 1)
          : Math.max(selectedIndex - 1, 0)
      if (newIndex >= 0 && newIndex <= 4) {
        setSelectedIndex(newIndex)
        setSelectedValue(searchResults[newIndex]?.name || '')
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selectedResult = searchResults[selectedIndex]
      if (selectedResult) {
        handleSelect(selectedResult)
      } else {
        onTagSelect(selectedValue, field.name)
        resetSelection()
      }
    }
  }

  const handleSelect = (result) => {
    onTagSelect(result, field.name)
    resetSelection()
  }

  const handleKeyUp = (e, result) => {
    if (e.key === 'Enter') {
      handleSelect(result)
    }
  }

  const resetSelection = () => {
    setSelectedValue('')
    setSearchResults([])
    setSelectedIndex(-1)
  }

  const isTagSelected = (tag) => {
    return (
      (field.name === 'themes' && themes.includes(tag)) ||
      (field.name === 'administrations' && administrations.includes(tag))
    )
  }

  const isFieldEmpty =
    field.name === 'themes' ? themes.length === 0 : administrations.length === 0

  return (
    <div>
      <Input
        label={field.label}
        className="fr-mb-1w"
        nativeInputProps={{
          onChange: handleSearch,
          onKeyDown: handleKeyDown,
          value: selectedValue,
          name: field.name,
          tabIndex: 0,
        }}
        state={showError && isFieldEmpty ? 'error' : 'default'}
        stateRelatedMessage={
          showError && isFieldEmpty ? `Le champ ${field.label} est obligatoire` : ''
        }
      />
      {field.name === 'administrations' && (
        <div tabIndex={-1} className="fr-mb-2v">
          {searchResults
            .slice(0, 5)
            .filter((result) => !isTagSelected(result))
            .map((result, index) => (
              <div
                className={`fr-card cursor-pointer p-0 ${
                  selectedIndex === index ? 'bg-light-grey' : ''
                }`}
                key={result}
                onClick={() => handleSelect(result)}
                onKeyUp={(e) => handleKeyUp(e, result)}
                tabIndex={0}
              >
                <p className="fr-ml-3w fr-mt-1w fr-mb-1w">{result}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
