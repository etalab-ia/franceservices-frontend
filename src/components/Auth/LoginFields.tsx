import Input from '@codegouvfr/react-dsfr/Input'
import { PasswordInput } from '@codegouvfr/react-dsfr/blocks/PasswordInput'
import Fuse from 'fuse.js'
import Papa from 'papaparse'
import { useContext, useEffect, useMemo, useState } from 'react'

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
        const fieldKey = `${field.nativeInputProps.name}-${index}`
        return (field.nativeInputProps.type === 'password' &&
          field.nativeInputProps.name === 'password') ||
          field.nativeInputProps.name === 'passwordSignup' ? (
          <div className="fr-mb-2w" key={fieldKey}>
            <PasswordInput
              label={field.label}
              nativeInputProps={{
                ...field.nativeInputProps,
                onChange: handleChange,
                onKeyDown: handleKeyDown,
              }}
            />

            {field.nativeInputProps.name === 'passwordSignup' && (
              <div>
                <p className="fr-text--xs fr-mb-1w max-h-[16px]">
                  Le mot de passe doit contenir au moins:
                </p>
                <div className="fr-mb-1w flex max-h-[16px]">
                  <span
                    className="fr-icon-info-fill fr-icon--sm fr-text-default--info fr-mr-2v"
                    aria-hidden="true"
                  />
                  <p className="fr-text-default--info fr-text--xs">8 caractères</p>
                </div>
                <div className="fr-mb-1w flex max-h-[16px]">
                  <span
                    className="fr-icon-info-fill fr-icon--sm fr-text-default--info fr-mr-2v"
                    aria-hidden="true"
                  />
                  <p className="fr-text-default--info fr-text--xs">
                    1 caractère spécial $!%*+-?&#_=.,:;@,
                  </p>
                </div>
                <div className="fr-mb-1w flex max-h-[16px]">
                  <span
                    className="fr-icon-info-fill fr-icon--sm fr-text-default--info fr-mr-2v"
                    aria-hidden="true"
                  />
                  <p className="fr-text-default--info fr-text--xs"> 1 chiffre</p>
                </div>
              </div>
            )}
          </div>
        ) : field.nativeInputProps.type === 'mfs' ? (
          <MFSInput
            key={fieldKey}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            matricule={matricule}
            setMatricule={setMatricule}
          />
        ) : field.nativeInputProps.type !== 'mfs' ? (
          <Input
            label={field.label}
            key={fieldKey}
            hintText={field.hintText}
            nativeInputProps={{
              ...field.nativeInputProps,
              onChange: handleChange,
              onKeyDown: handleKeyDown,
            }}
          />
        ) : null
      })}
    </>
  )
}

function MFSInput({ selectedValue, setSelectedValue, matricule, setMatricule }) {
  const [searchResults, setSearchResults] = useState([])
  const [data, setData] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const handleKeyDown = (e) => {
    if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault()
      const newIndex =
        e.key === 'ArrowDown'
          ? Math.min(selectedIndex + 1, searchResults.length - 1)
          : Math.max(selectedIndex - 1, 0)
      if (newIndex >= 0 && newIndex <= 4) {
        setSelectedIndex(newIndex)
        setSelectedValue(searchResults[newIndex]?.lib_fs || '')
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selectedResult = searchResults[selectedIndex]
      if (selectedResult) {
        handleSelect(selectedResult)
      } else {
        // resetSelection()
      }
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/mfs.csv')
      const reader = response.body.getReader()
      const result = await reader.read()
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value)
      const parsedData = Papa.parse(csv, { header: true }).data
      setData(parsedData)
    }

    fetchData()
  }, [])

  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: ['lib_fs'],
        includeScore: true,
        threshold: 0.2,
      }),
    [data],
  )

  const handleSearch = (e) => {
    const value = e.target.value
    setSelectedValue(value)
    const results = fuse.search(value)
    setSearchResults(results.slice(0, 5).map((result) => result.item))
    setMatricule('')
    setSelectedIndex(-1)
  }

  const handleSelect = (item) => {
    setSelectedValue(item.lib_fs)
    setMatricule(item.id_fs)
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
          {searchResults.map((item, index) => (
            <div
              className={`fr-card cursor-pointer p-0 ${
                selectedIndex === index ? 'bg-light-grey' : ''
              }`}
              key={item}
              onClick={() => handleSelect(item)}
            >
              <p className="fr-ml-3w fr-mt-1w fr-mb-1w">{item.lib_fs}</p>
            </div>
          ))}
        </div>
      </div>
      <Input
        disabled
        label="Matricule"
        className="fr-mb-1w fr-ml- fr-col-4 ml-auto"
        nativeInputProps={{ value: matricule, disabled: true }}
      />
    </div>
  )
}
