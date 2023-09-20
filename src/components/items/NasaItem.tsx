export type NasaData = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

type NasaItemProps = {
  nasaData: NasaData;
};

export const NasaItem = (props: NasaItemProps) => {
  const { nasaData } = props;

  return (
    <div className="nasaDiv">
      <h2>{nasaData.title}</h2>
      <p>{nasaData.explanation}</p>
      <img src={nasaData.url} alt={nasaData.title} />
    </div>
  );
};
