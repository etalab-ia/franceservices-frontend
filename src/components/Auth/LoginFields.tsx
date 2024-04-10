import Input from '@codegouvfr/react-dsfr/Input'
import { PasswordInput } from '@codegouvfr/react-dsfr/blocks/PasswordInput'
import Fuse from 'fuse.js'
import { useMemo, useState } from 'react'

export const LoginFields = ({
  fields,
  handleChange,
  handleSubmit,
  selectedValue,
  setSelectedValue,
  matricule,
  setMatricule,
}) => {
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }
  return (
    <>
      {fields.map((field, index) => {
        return field.nativeInputProps.type === 'password' ? (
          <PasswordInput
            label={field.label}
            key={index}
            hintText={field.hintText}
            nativeInputProps={{
              ...field.nativeInputProps,
              onChange: handleChange,
              onKeyDown: handleKeyDown,
            }}
          />
        ) : field.nativeInputProps.type === 'mfs' ? (
          <MFSInput
            key={index}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            matricule={matricule}
            setMatricule={setMatricule}
          />
        ) : (
          <Input
            label={field.label}
            key={index}
            hintText={field.hintText}
            nativeInputProps={{
              ...field.nativeInputProps,
              onChange: handleChange,
              onKeyDown: handleKeyDown,
            }}
          />
        )
      })}
    </>
  )
}

const options = {
  includeScore: true,
  includeMatches: true,
  threshold: 0.2,
  keys: ['name'],
}

export function MFSInput({
  selectedValue,
  setSelectedValue,
  matricule,
  setMatricule,
}: {
  selectedValue: string
  setSelectedValue: any
  matricule: string
  setMatricule: any
}) {
  const [searchResults, setSearchResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  console.log('value', selectedValue)
  const fuse = useMemo(() => new Fuse(maisonsFranceServiceType, options), [])

  const handleSearch = (e) => {
    const value = e.target.value
    setSelectedValue(value)
    setSelectedIndex(-1)
    setSearchResults(value ? fuse.search(value).map((result) => result.item) : [])
    setMatricule('')
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
        handleSelect(selectedValue)
        resetSelection()
      }
    }
  }

  const handleSelect = (result) => {
    setSelectedValue(result.name)
    setMatricule(result.matricule)
    resetSelection()
  }

  const resetSelection = () => {
    //  setSelectedValue('')
    setSearchResults([])
    setSelectedIndex(-1)
  }

  return (
    <div className="fr-grid-row">
      <div className="fr-col-7">
        <Input
          label="Maison France Services"
          className="fr-mb-1w"
          nativeInputProps={{
            onChange: handleSearch,
            onKeyDown: handleKeyDown,
            value: selectedValue,
            name: 'mfs',
            tabIndex: 0,
          }}
        />
        <div tabIndex={-1} className="fr-mb-2v">
          {searchResults.slice(0, 5).map((result, index) => (
            <div
              className={`fr-card cursor-pointer p-0 ${
                selectedIndex === index ? 'bg-light-grey' : ''
              }`}
              key={result.name}
              onClick={() => handleSelect(result)}
            >
              <p className="fr-ml-3w fr-mt-1w fr-mb-1w">{result.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Input
        label="Matricule"
        className="fr-mb-1w fr-ml- fr-col-4 ml-auto"
        nativeInputProps={{ value: matricule }}
        disabled
      />
    </div>
  )
}

const maisonsFranceServiceType = [
  { name: 'test', matricule: '123456789' },
  { name: 'test2', matricule: 'hjkhk' },
  { name: 'onoo', matricule: 'kjhhi' },
]
