import moment from 'moment'

export function downloadJSON(json, filename) {
    const blob = new Blob([json], { type: 'application/json' });

    /* taken from react-csv */
    if (navigator && navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const dataURI = `data:application/json;charset=utf-8,${json}`;

      const URL = window.URL || window.webkitURL;
      const downloadURI = typeof URL.createObjectURL === 'undefined' ? dataURI : URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.setAttribute('href', downloadURI);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
}


export function formatAuthors(authors) {
    if (authors) {
      return authors.map(author => (author.given_name + " " + author.family_name)).join(", ");
    } else {
      return "";
    }
}


export function formatTimeStampToLongString(ISOtimestamp) {
  if (ISOtimestamp) {
    const d = new Date(ISOtimestamp);
    return d.toUTCString();
  } else {
      return "";
  }
}


export function formatTimeStampToCompact(ISOtimestamp) {
  if (ISOtimestamp) {
    return moment(ISOtimestamp).format('DD-MM-YYYY (HH:MM)');
  } else {
      return "";
  }
}


export function roundFloat(value, places) {
  return `${value.toFixed(places)}`;
}


export function formatValue(label, value) {
  if (["owner", "author"].indexOf(label) > -1) {
      value = formatAuthors(value);
  }
  if (["timestamp", "creation_date"].indexOf(label) > -1) {
      value = formatTimeStampToLongString(value);
  }
  if (label === "app") {
      value = value.collab_id;
  }
  if (label === "private") {
    value = value ? "True" : "False";
  }
  return value;
}


export function formatLabel(label) {
  // function to format labels by converting underscores to spaces, and
  // capitalizing each word; certain specific labels are changed entirely to uppercase
  if (["id", "uri"].indexOf(label) > -1) {
      label = label.toUpperCase();
  } else {
      label = label.replace(/_/g, ' ');
      label = label
              .toLowerCase()
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
  }
  return label;
}