  select a.id, a.name,
  (select json_agg(alb)
  from (
    select * from albums where artist_id = a.id
  ) alb
) as albums